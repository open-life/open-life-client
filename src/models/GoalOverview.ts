export default class GoalOverview {
    public Name: string;
    public Progress: number;
    public Target: number;
    public UserId: string;

    constructor(name: string, progress: number, target: number, userId: string) {
        this.Name = name;
        this.Progress = progress;
        this.Target = target;
        this.UserId = userId;
    }
}