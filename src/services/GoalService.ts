import { HabitGoal } from '../models/HabitGoal';
import GoalOverview from '../models/GoalOverview';
import { NumberGoal } from '../models/NumberGoal';
import { ListGoal } from '../models/ListGoal';
import { Observable, BehaviorSubject } from 'rxjs';
import HttpClient from './HttpClient';

export default class GoalService {
    private _httpClient: HttpClient;

    private _goalOverviews: BehaviorSubject<GoalOverview[]>;
    public GoalOverViews: Observable<GoalOverview[]>;

    private _habitGoals: BehaviorSubject<HabitGoal[]>;
    public HabitGoals: Observable<HabitGoal[]>;

    private _listGoals: BehaviorSubject<ListGoal[]>;
    public ListGoals: Observable<ListGoal[]>;

    private _numberGoals: BehaviorSubject<NumberGoal[]>;
    public NumberGoals: Observable<NumberGoal[]>;

    constructor() {
        this._httpClient = new HttpClient();

        this._goalOverviews = new BehaviorSubject([] as GoalOverview[]);
        this.GoalOverViews = this._goalOverviews.asObservable();

        this._habitGoals = new BehaviorSubject([] as HabitGoal[]);
        this.HabitGoals = this._habitGoals.asObservable();

        this._listGoals = new BehaviorSubject([] as ListGoal[]);
        this.ListGoals = this._listGoals.asObservable();

        this._numberGoals = new BehaviorSubject([] as NumberGoal[]);
        this.NumberGoals = this._numberGoals.asObservable();
    }

    loadGoalOverviews(): Observable<GoalOverview[]> {
        return this._httpClient.get<GoalOverview[]>("https://localhost:44343/api/Goals");
    }

    loadHabitGoals(): Observable<HabitGoal[]> {
        return this._httpClient.get<HabitGoal[]>("https://localhost:44343/api/HabitGoal");
    }

    postHabitGoal(habitGoal: HabitGoal): Observable<HabitGoal> {
        return this._httpClient.post<HabitGoal>("https://localhost:44343/api/HabitGoal", habitGoal);
    }

    loadNumberGoals(): Observable<NumberGoal[]> {
        return this._httpClient.get<NumberGoal[]>("https://localhost:44343/api/NumberGoal");
    }

    postNumberGoal(numberGoal: NumberGoal): Observable<NumberGoal> {
        return this._httpClient.post<NumberGoal>("https://localhost:44343/api/NumberGoal", numberGoal);
    }

    loadListGoals(): Observable<ListGoal[]> {
        return this._httpClient.get<ListGoal[]>("https://localhost:44343/api/ListGoal");
    }

    postListGoal(listGoal: ListGoal): Observable<ListGoal> {
        return this._httpClient.post<ListGoal>("https://localhost:44343/api/ListGoal", listGoal);
    }
}