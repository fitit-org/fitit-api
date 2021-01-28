import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import DateType from '../dateType';
import ActivityType from '../ActivityType/qlType';

export default new GraphQLObjectType({
  name: 'Activity',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    startTime: {
      type: new GraphQLNonNull(DateType),
    },
    endTime: {
      type: new GraphQLNonNull(DateType),
    },
    activity: {
      type: new GraphQLNonNull(ActivityType),
    },
  }),
});
