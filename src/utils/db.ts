import { Db } from 'mongodb';
import User from '../types/user.interface';
import ActivityLog from '../types/activityLog.interface';
import ActivityType from '../types/activityType.interface';
import Class from '../types/class.interface';
import { ObjectId } from 'bson';

export async function popualateUsers(
  db: Db,
  users: Array<User>,
  populateClass = true,
  populateActivityTypes = true
): Promise<Array<User>> {
  await Promise.all(
    users.map(async (user) => {
      user = await populateUser(db, user, populateClass, populateActivityTypes);
    })
  );
  return users;
}

export async function populateUser(
  db: Db,
  user: User,
  populateClass = true,
  populateActivityTypes = true
): Promise<User> {
  const userObj = { ...user };
  if (user.activityLog_ids) {
    userObj.activityLog_ids = (await db
      .collection('activityLogs')
      .find({
        _id: {
          $in: user.activityLog_ids,
        },
      })
      .toArray()) as Array<ActivityLog>;
    if (populateActivityTypes) {
      userObj.activityLog_ids = await populateActivities(
        db,
        userObj.activityLog_ids
      );
    }
  }
  if (populateClass) {
    userObj.class_ids = (await db
      .collection('classes')
      .find({
        _id: {
          $in: user.class_ids,
        },
      })
      .toArray()) as Array<Class>;
  }
  return userObj;
}

export async function populateActivities(
  db: Db,
  activities: Array<ActivityLog>
): Promise<Array<ActivityLog>> {
  await Promise.all(
    activities.map(async (act) => {
      act = await populateActivity(db, act);
    })
  );
  return activities;
}

export async function populateActivity(
  db: Db,
  act: ActivityLog
): Promise<ActivityLog> {
  act.activityType_id = (await db.collection('activityTypes').findOne({
    _id: act.activityType_id as ObjectId,
  })) as ActivityType;
  return act;
}
