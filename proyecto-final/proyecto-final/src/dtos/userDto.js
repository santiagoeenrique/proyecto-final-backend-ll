class UserDto {
    constructor(user) {
      this.id = user._id;
      this.email = user.email;
      this.role = user.role;
      // Otros campos que quieras exponer
    }
  }
  
  module.exports = UserDto;