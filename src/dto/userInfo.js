export class userInfoDto {
    constructor(userInfo) {
        this.nombre = userInfo.nombre,
            this.apellido = userInfo.apellido,
            this.email = userInfo.email,
            this.celular = userInfo.celular,
            this.sexo = userInfo.sexo,
            this.edad = userInfo.edad
    }
};