export class Parent {
  constructor (name) {
    this.name = name;
    this.occupiedUntil = null;
    this.assign = this.assign.bind(this);
  }
  assign (activityEnd) {
    this.occupiedUntil = activityEnd;
  }
}

export class Activity {
  constructor (start, end) {
      this.start = start;
      this.end = end;
  }
}

export class Schedule {
  constructor (activities) {
      this.schedule = '';
      this.populateActivities = this.populateActivities.bind(this);
      this.activities = this.populateActivities(activities);
      this.assign = this.assign.bind(this);
  }
  populateActivities (activitiesArray) {
    const classyActivities = [];
    activitiesArray.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < activitiesArray.length; i++) {
      classyActivities.push(new Activity(parseInt(activitiesArray[i][0]), parseInt(activitiesArray[i][1])));
    }
    return classyActivities;
  }
  output () {
    console.log(this.schedule);
  }
  assign (parent1, parent2) {
    for (const activity of this.activities) {
      if (parent1.occupiedUntil <= activity.start) {
        parent1.assign(activity.end);
        this.schedule += parent1.name;
      } else if (parent2.occupiedUntil <= activity.start) {
        parent2.assign(activity.end);
        this.schedule += parent2.name;
      } else {
        this.schedule = 'IMPOSSIBLE';
        break;
      }
    }
  }
}

