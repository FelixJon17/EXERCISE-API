const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

// memanggil fungsi mengecekEmail pada users-repository

// async itu fungsi sembarang
async function mengecekEmail2(email) {
  try {
    const cekEmail = await usersRepository.mengecekEmail(email);
    if (cekEmail) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // kalau pakai fungsi try harus ada catch untuk return error
    console.error('gagal untuk mengecek email:', error);
    return false;
  }
}

async function cekPassLama(id, passLama) {
  const users = await usersRepository.getUser(id);
  const pw = users ? users.password : '<RANDOM_PASSWORD_FILLER>';
  const pwcheck = await passwordMatched(passLama, pw);

  if (users && pwcheck) {
    return true;
  } else {
    return false;
  }
}

// fungsi update password
async function updatepw(id, passBaru) {
  const pwhash = await hashPassword(passBaru);
  const users = await usersRepository.getUser(id);

  if (!users) {
    return null;
  }

  try {
    await usersRepository.changePass(id, pwhash);
  } catch (error) {
    return null;
  }
  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  mengecekEmail2,
  cekPassLama,
  updatepw,
};
