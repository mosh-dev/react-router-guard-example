import React, { Component, ReactNode } from 'react';
import { ObjectMap } from '../../../../../typings';

class PostsComponent extends Component<ObjectMap, ObjectMap> {

  render(): ReactNode {
    return (
      <div>
        List posts
      </div>
    )
  }
}

export const Posts = PostsComponent;
export default Posts;

