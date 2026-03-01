import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config/env.js';

const buildUserResponse = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});

const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || 'citizen',
      location,
    });

    const token = jwt.sign({ sub: user._id.toString(), role: user.role }, config.jwtSecret, {
      expiresIn: '7d',
    });

    setAuthCookie(res, token);

    return res.status(201).json({ user: buildUserResponse(user) });
  } catch (err) {
    console.error('Signup error', err);
    return res.status(500).json({ message: 'Failed to signup' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: user._id.toString(), role: user.role }, config.jwtSecret, {
      expiresIn: '7d',
    });

    setAuthCookie(res, token);

    return res.json({ user: buildUserResponse(user) });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Failed to login' });
  }
};

export const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    return res.json({ user: req.user });
  } catch (err) {
    console.error('Me error', err);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

export const logout = (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
};

