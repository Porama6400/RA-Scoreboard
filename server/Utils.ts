export class Utils {

    public static generateID(): string {
        var text = "";
        var possible = "abcdefghjkmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}