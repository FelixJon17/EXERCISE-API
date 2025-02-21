const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const usersSchema = require('../../../models/users-schema');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request, response, next) {
  try {
    const users = await usersService.getUsers();
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;

    const emailexist = await usersService.mengecekEmail2(email);
    if (emailexist) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email sudah terdaftar'
      );
    }

    const pw = await password;
    const pwconfirm = await confirmPassword;
    if (pwconfirm != pw) {
      throw errorResponder(errorTypes.INVALID_PASSWORD, 'Password salah');
    }

    const success = await usersService.createUser(name, email, password);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(200).json({ name, email });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    const emailexist = await usersService.mengecekEmail2(email);
    if (emailexist) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email sudah terdaftar'
      );
    }

    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

// fungsi untuk mengubah password
async function changepw(request, reponse, next) {
  try {
    const id = request.params.id;
    const password_lama = request.body.password_lama;
    const password_baru = request.body.password_baru;
    const password_cek = request.body.password_cek;

    const cekpasslama = await usersService.cekPassLama(id, password_lama);
    if (cekpasslama === false) {
      throw errorResponder(errorTypes.INVALID_PASSWORD, 'password lama salah');
    }

    if (password_cek != password_baru) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'salah masukkan password baru'
      );
    }

    password_changed = password_baru;
    const success = await usersService.updatepw(id, password_changed);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'gagal membuat user'
      );
    }
    return reponse.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changepw,
};
