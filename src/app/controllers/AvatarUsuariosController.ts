interface Request {
    user_id: string;
    avatarFileName: string;
}

class AvatarUsuariosController {
    public async update({ user_id, avatarFileName }: Request): Promise<void> {
        // vamos ver se conseguimos upar no git
    }
}

export default AvatarUsuariosController;
