export default class GoalOverview {
    public Name: string;
    public Progress: string;
    public UserId: number;

    constructor(name: string, progress: string, userId: number) {
        this.Name = name;
        this.Progress = progress;
        this.UserId = userId;
    }
}