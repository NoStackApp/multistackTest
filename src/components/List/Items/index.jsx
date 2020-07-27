// ns__file unit: list, comp: Items

// ns__custom_start unit: list, comp: Items, loc: beforeImports
/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom` with`start`
    and `// ns__custom` with `end`
    (3) if you need to modify code outside of those areas, please contact
    info@pivotate.com and send the file with a request.  We can always generate
    new `ns__custom` lines to accommodate you.

 */

'use strict';
/*
    This is a location for anything at the top of your code.  By default,
    `use strict` is shown.
 */
// ns__custom_end unit: list, comp: Items, loc: beforeImports

import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

import ItemCreationForm from '../ItemCreationForm';
import Item from '../Item';

import { SOURCE_LIST_ID } from '../../../config';
import {
  LIST_RELATIONSHIPS,
  SOURCE_LIST_QUERY,
} from '../../source-props/list';

// ns__custom_start unit: list, comp: Items, loc: addedImports
/*
    Put any additional import statements here.
 */
// ns__custom_end unit: list, comp: Items, loc: addedImports

// ns__custom_start unit: list, comp: Items, loc: styling
/*
  This section is for styling.  The default below is just a sample and can be replaced.
 */

const ItemsStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
// ns__custom_end unit: list, comp: Items, loc: styling

class Items extends Component {
// ns__custom_start unit: list, comp: Items, loc: beginning
  /*
      This is a location for anything at the top of your code.  By default,
      `use strict` is shown.
   */
// ns__custom_end unit: list, comp: Items, loc: beginning
  state = {
    selectedItemId: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: list, comp: Items, loc: componentDidMount
    // ns__custom_end unit: list, comp: Items, loc: componentDidMount
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: list, comp: Items, loc: componentWillUnmount
    // ns__custom_end unit: list, comp: Items, loc: componentWillUnmount
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selectedItemId: null });
    }
  };

  handleSelect = (id) => this.setState({ selectedItemId: id });

  render() {
    const { userId } = this.props;
    const { selectedItemId } = this.state;
    const parameters = {
      currentUser: userId,
    };

    // ns__custom_start unit: list, comp: Items, loc: renderBeginning
    // ns__custom_end unit: list, comp: Items, loc: renderBeginning

    return (
      <Unit
        id={ SOURCE_LIST_ID }
        typeRelationships={ LIST_RELATIONSHIPS }
        query={ SOURCE_LIST_QUERY }
        parameters={parameters}
      >
        {({loading, error, data, refetchQueries}) => {
          if (loading) return 'Loading...';

          if (error) {
            console.error(error);
            return `Error: ${error.graphQLErrors}`;
          }

          const items = data.unitData.map((el) => flattenData(el));

      // ns__custom_start unit: list, comp: Items, loc: beforeReturn
      // ns__custom_end unit: list, comp: Items, loc: beforeReturn
          return (
            <>
              <ItemCreationForm
                  userId={ userId }
                  refetchQueries={refetchQueries}
                  // ns__custom_start unit: list, comp: Items, loc: addedPropsForCreationForm
                  // ns__custom_end unit: list, comp: Items, loc: addedPropsForCreationForm
              />
              <ItemsStyleWrapper
                ref={this.wrapperRef}
                onClick={this.handleClick}
              >
                { items &&
                  items.map((item) => (
                  <Item
                    key={v4()}
                    parentId={ userId }
                    item={ item }
                    selected={ item.id === selectedItemId }
                    refetchQueries={refetchQueries}
                    onSelect={this.handleSelect}
                    // ns__custom_start unit: list, comp: Items, loc: addedPropsForChildren
                    // ns__custom_end unit: list, comp: Items, loc: addedPropsForChildren
                  />
                )) }
              </ItemsStyleWrapper>
                {/* ns__custom_start unit: list, comp: Items, loc: renderEnding */}
                {/* ns__custom_end unit: list, comp: Items, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
    );
  }
}

export default Items;
