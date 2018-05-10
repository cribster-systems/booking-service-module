const graphql = require('graphql');
const graphqlisodate = require('graphql-iso-date');
const { Room } = require('../models/booking.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

const { GraphQLDate } = graphqlisodate;

const RoomType = new GraphQLObjectType({
  name: 'Room',
  fields: () => ({
    room_id: { type: GraphQLInt },
    room_name: { type: GraphQLString },
    world_name: { type: GraphQLString },
    keywords: { type: GraphQLString },
    room_rate: { type: GraphQLInt },
    booked_dates: { type: new GraphQLList(GraphQLDate) },
    guest_number: { type: GraphQLString },
    guest_name: { type: GraphQLString },
    host_name: { type: GraphQLString },
    discount: { type: GraphQLBoolean },
    cleaning_fee: { type: GraphQLBoolean },
    review_count: { type: GraphQLInt },
    review_grade: { type: GraphQLInt },
    created_date: { type: GraphQLDate },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Room: {
      type: RoomType,
      args: { room_id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Room.findOne({ room_id: args.room_id });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    bookDate: {
      type: GraphQLDate,
      args: {
        room_id: { type: GraphQLInt },
        date: { type: GraphQLDate },
      },
      resolve(parent, args) {
        return Room.findOneAndUpdate({ room_id: args.room_id }, { $push: { booked_dates: args.date.toISOString() } });
      },
    },
  },

});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
