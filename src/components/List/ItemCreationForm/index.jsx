// ns__file unit: list, comp: ItemCreationForm
// ns__custom_start unit: list, comp: ItemCreationForm, loc: beforeImports
/*

  This file contains generated code, with some locations for adding modifications.
  This file will occasionally be replaced as needed when a stack changes.  But,
  you are allowed to add code in certain locations.  You may also create additional
  files and include them here.

  IMPORTANT:
    (1) don't ever delete comment lines beginning `// ns__custom`.
    (2) don't modify the code except between matching comment lines `// ns__custom with start`
    and `// ns__custom with end`
    (3) if you need to modify code outside of those areas, please contact
    info@pivotate.com and send the file with a request.  We can always generate
    new `ns__custom` lines to accommodate you.

 */

'use strict';
/*
    This is a location for anything at the top of your code.  By default,
    `use strict` is shown.
 */
// ns__custom_end unit: list, comp: ItemCreationForm, loc: beforeImports
import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_ITEM_FOR_LIST_ACTION_ID
 } from '../../../config';

// ns__custom_start unit: list, comp: ItemCreationForm, loc: addedImports
// ns__custom_end unit: list, comp: ItemCreationForm, loc: addedImports

// ns__custom_start unit: list, comp: ItemCreationForm, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;
// ns__custom_end unit: list, comp: ItemCreationForm, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function ItemCreationForm({
  userId,
  createItem,
  refetchQueries,
  // ns__custom_start unit: list, comp: ItemCreationForm, loc: addedProps
  // ns__custom_end unit: list, comp: ItemCreationForm, loc: addedProps
}) {
  const [ itemValue, updateItemValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);
  // ns__custom_start unit: list, comp: ItemCreationForm, loc: beginning
    /* any special declarations etc. */
  // ns__custom_end unit: list, comp: ItemCreationForm, loc: beginning

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);

    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    // const newItemData = JSON.parse(createItemResponse.data.Execute);

    


    updateItemValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  // ns__custom_start unit: list, comp: ItemCreationForm, loc: beforeReturn
  // ns__custom_end unit: list, comp: ItemCreationForm, loc: beforeReturn

  // ns__start_section unit: list, comp: ItemCreationForm, loc: return
  return (
    <Form>
      <label htmlFor='item-value'>
        Item:
        <input
          id='item-value'
          type='text'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ itemValue }
          disabled={loading}
        />
      </label>
      <Button type='submit'  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating Item...'
            : 'Create Item'
        }
      </Button>
    </Form>
  );
  // ns__end_section unit: list, comp: ItemCreationForm, loc: return

}

export default compose(
  graphql(EXECUTE, { name: 'createItem' }),
  
)(ItemCreationForm);
