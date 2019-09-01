export class ListGoal {
    public ListGoalId: number;
    public Name: string;
    public ListName: string;
    public StartDate: Date;
    public EndDate: Date;
    public Target: number;
    public Items: ListItem[] = [];

    public UserId: number;

    constructor(name: string, listName: string, start: Date, end: Date, target: number, userId: number) {
        this.ListGoalId = 0;
        this.Name = name;
        this.ListName = listName;
        this.StartDate = start;
        this.EndDate = end;
        this.Target = target;
        this.UserId = userId;
    }
}

export class ListItem {
    public ListItemId: number;
    public Name: string;
    public Progress: Progress;

    public ListGoalId: number;

    constructor(goalId: number, name: string, progress: Progress) {
        this.ListGoalId = goalId;

        this.ListItemId = 0;
        this.Name = name;
        this.Progress = progress;
    }
}

export enum Progress {
    Completed = "Completed",
    InProgress = "In Progress"
}