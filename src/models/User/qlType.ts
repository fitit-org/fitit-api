import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import ClassType from '../Class/qlType';
import DateType from '../dateType';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    surname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    dateCreated: {
      type: new GraphQLNonNull(DateType),
    },
    isActive: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    isTeacher: {
      type: GraphQLBoolean,
    },
    dateOfBirth: {
      type: DateType,
    },
    height: {
      type: GraphQLInt,
    },
    weight: {
      type: GraphQLInt,
    },
    classes: {
      type: GraphQLList(ClassType),
    },
  }),
});
