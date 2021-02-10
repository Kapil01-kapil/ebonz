import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {routes} from "./route.reducer";
import {categories} from './category.reducer';
import {posts} from './post.reducer';
import {newPost} from './newPost.reducer';
import {favorites} from './favorite.reducer';
import {suggestions} from './suggestion.reducer';
import {conversations} from './conversation.reducer';
import {follow} from './follow.reducer';
import {notifications} from './notification.reducer';
import {locations} from './location.reducer';
import {colors} from './color.reducer';
import {filters} from './filter.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users, 
  posts,
  newPost,
  favorites,
  categories,
  suggestions,
  conversations,
  alert,
  routes,
  follow,
  notifications,
  locations,
  filters,
  colors
});

export default rootReducer;