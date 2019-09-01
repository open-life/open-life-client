import { HabitGoal, HabitLog } from '../models/HabitGoal';
import GoalOverview from '../models/GoalOverview';
import { NumberGoal, NumberLog } from '../models/NumberGoal';
import { ListGoal, ListItem } from '../models/ListGoal';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';
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

        this.loadUserGoals = this.loadUserGoals.bind(this);
        this.saveHabitGoal = this.saveHabitGoal.bind(this);
        this.saveListGoal = this.saveListGoal.bind(this);
        this.saveNumberGoal = this.saveNumberGoal.bind(this);
        this.saveHabitLog = this.saveHabitLog.bind(this);
        this.saveListItem = this.saveListItem.bind(this);
        this.saveNumberLog = this.saveNumberLog.bind(this);
    }

    loadUserGoals(username: string): Observable<any> {
        return zip(this.loadGoalOverviews(username), this.loadHabitGoals(username), this.loadListGoals(username), this.loadNumberGoals(username));
    }

    private loadGoalOverviews(username: string): Observable<GoalOverview[]> {
        return this.load(`https://localhost:44343/api/Goals/${username}`, this._goalOverviews);
    }

    private loadHabitGoals(username: string): Observable<HabitGoal[]> {
        return this.load(`https://localhost:44343/api/HabitGoal/${username}`, this._habitGoals);
    }

    private loadNumberGoals(username: string): Observable<NumberGoal[]> {
        return this.load(`https://localhost:44343/api/NumberGoal/${username}`, this._numberGoals);
    }

    private loadListGoals(username: string): Observable<ListGoal[]> {
        return this.load(`https://localhost:44343/api/ListGoal/${username}`, this._listGoals);
    }

    private load<T>(url: string, stateSubject: BehaviorSubject<T>): Observable<T> {
        return this._httpClient.get<T>(url)
            .pipe(
                map((response: T) => {
                    stateSubject.next(response);
                    return response;
                }),
                take(1)
            );
    }

    saveHabitGoal(habitGoal: HabitGoal): Observable<HabitGoal> {
        if (habitGoal.HabitGoalId === 0) {
            return this.save<HabitGoal>("https://localhost:44343/api/HabitGoal", habitGoal, this._habitGoals);
        } else {
            return this._httpClient.put<HabitGoal>(`https://localhost:44343/api/HabitGoal/${habitGoal.HabitGoalId}`, habitGoal);
        }
    }

    saveNumberGoal(numberGoal: NumberGoal): Observable<NumberGoal> {
        if (numberGoal.NumberGoalId === 0) {
            return this.save<NumberGoal>("https://localhost:44343/api/NumberGoal", numberGoal, this._numberGoals);
        } else {
            return this._httpClient.put<NumberGoal>(`https://localhost:44343/api/NumberGoal/${numberGoal.NumberGoalId}`, numberGoal);
        }
    }

    saveListGoal(listGoal: ListGoal): Observable<ListGoal> {
        if (listGoal.ListGoalId === 0) {
            return this.save<ListGoal>("https://localhost:44343/api/ListGoal", listGoal, this._listGoals);
        } else {
            return this._httpClient.put<ListGoal>(`https://localhost:44343/api/ListGoal/${listGoal.ListGoalId}`, listGoal);
        }
    }

    private save<T>(url: string, goal: T, stateSubject: BehaviorSubject<T[]>): Observable<T> {
        let goals = stateSubject.value;
        goals.push(goal);
        stateSubject.next(goals);

        return this._httpClient.post<T>(url, goal);
    }

    saveHabitLog(habitLog: HabitLog): Observable<HabitGoal> {
        let habitGoals = this._habitGoals.value;
        let habitGoal = habitGoals[habitGoals.findIndex(g => g.HabitGoalId === habitLog.HabitGoalId)];

        if (!habitGoal.Logs) {
            habitGoal.Logs = [];
        }

        habitGoal.Logs.push(habitLog);
        return this.saveHabitGoal(habitGoal);
    }

    saveNumberLog(numberLog: NumberLog): Observable<NumberGoal> {
        let numberGoals = this._numberGoals.value;
        let numberGoal = numberGoals[numberGoals.findIndex(g => g.NumberGoalId === numberLog.NumberGoalId)];

        if (!numberGoal.Logs) {
            numberGoal.Logs = [];
        }

        numberGoal.Logs.push(numberLog);
        return this.saveNumberGoal(numberGoal);
    }

    saveListItem(listItem: ListItem): Observable<ListGoal> {
        let listGoals = this._listGoals.value;
        let listGoal = listGoals[listGoals.findIndex(g => g.ListGoalId === listItem.ListGoalId)];

        if (!listGoal.Items) {
            listGoal.Items = [];
        }

        listGoal.Items.push(listItem);
        return this.saveListGoal(listGoal);
    }
}
