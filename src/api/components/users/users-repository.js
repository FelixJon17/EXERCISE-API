const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

 // async itu fungsi sembarang 
async function mengecekEmail (email) {
  // mengecek email apakah sudah terdaftar di database atau belum

  // kenapa ({email:email}) karena email pertama ada di database lalu email kedua dari parameter 
  const emails = await User.findOne({email:email});
  // untuk mengembalikan boolean, false jika email tidak ada di database true jika email ada
  return !!emails;
}


async function changePass (id, newPass){
  return User.updateOne(
    {
      _id : id,
    },
    {
      $set:{newPass,},
    }
  );
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  mengecekEmail,
  changePass,
};
