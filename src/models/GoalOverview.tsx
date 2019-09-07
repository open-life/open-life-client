export default class GoalOverview {
    public Name: string;
    public Progress: number;
    public Target: number;
    public UserId: number;

    constructor(name: string, progress: number, target: number, userId: number) {
        this.Name = name;
        this.Progress = progress;
        this.Target = target;
        this.UserId = userId;
    }
}