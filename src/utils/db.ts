import User from '../types/user.interface';
import ActivityLog from '../types/activityLog.interface';
import ActivityType from '../types/activityType.interface';
import Class from '../types/class.interface';
import { ObjectId } from 'bson';
import { MongoHelper } from './mongo.helper';

export async function popualateUsers(
  users: Array<User>,
  populateClass = true,
  populateActivityTypes = true
): Promise<Array<User>> {
  await Promise.all(
    users.map(async (user) => {
      const populatedUser = await populateUser(
        user,
        populateClass,
        populateActivityTypes
      );
      user = populatedUser;
    })
  );
  return users;
}

export async function populateUser(
  user: User,
  populateClass = true,
  populateActivityTypes = true
): Promise<User> {
  const userObj = { ...user };
  if (user.activityLog_ids) {
    userObj.activityLog_ids = (await (await MongoHelper.getDB())
      .collection('activityLogs')
      .find({
        _id: {
          $in: user.activityLog_ids,
        },
      })
      .toArray()) as Array<ActivityLog>;
    if (populateActivityTypes) {
      userObj.activityLog_ids = await populateActivities(
        userObj.activityLog_ids
      );
    }
  }
  if (populateClass) {
    userObj.class_ids = (await (await MongoHelper.getDB())
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
  activities: Array<ActivityLog>
): Promise<Array<ActivityLog>> {
  await Promise.all(
    activities.map(async (act) => {
      const populatedActivity = await populateActivity(act);
      act = populatedActivity;
    })
  );
  return activities;
}

export async function populateActivity(act: ActivityLog): Promise<ActivityLog> {
  act.activityType_id = (await (await MongoHelper.getDB())
    .collection('activityTypes')
    .findOne({
      _id: act.activityType_id as ObjectId,
    })) as ActivityType;
  return act;
}
