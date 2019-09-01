export default class User {
    public UserId: number;
    public Name: string;
    public FamilyName: string;
    public GivenName: string;
    public Username: string;
    public Email: string;
    public EmailVerified: boolean;
    public ImageUrl: string;
    public Locale: string;
    public Nickname: string;
    public Sub: string;
    public UpdatedAt: Date;

    constructor(name: string, familyName: string, givenName: string, username: string, email: string, emailVerified: boolean, imageUrl: string, locale: string, nickname: string, sub: string, updatedAt: string) {
        this.UserId = 0;
        this.Name = name;
        this.FamilyName = familyName;
        this.GivenName = givenName;
        this.Username = username;
        this.Email = email;
        this.EmailVerified = emailVerified;
        this.ImageUrl = imageUrl;
        this.Locale = locale;
        this.Nickname = nickname;
        this.Sub = sub;
        this.UpdatedAt = new Date(updatedAt);
    }
}