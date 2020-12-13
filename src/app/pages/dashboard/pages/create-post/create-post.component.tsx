import React, { Component, ReactNode } from 'react';
import { ObjectMap } from '../../../../../typings';

class CreatePostComponent extends Component<ObjectMap, ObjectMap> {

  render(): ReactNode {
    return (
      <div className="row mt-5">
        Create post
      </div>
    )
  }
}

export default CreatePostComponent;

