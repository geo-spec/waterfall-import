'use strict'

import React from 'react'
import ActionDone from 'material-ui/svg-icons/action/done'
import ActionImport from 'material-ui/svg-icons/communication/import-export'
import {List, ListItem} from 'material-ui/List'

import Subheader from 'material-ui/Subheader'
import Client from '../containers/Client'

require('styles//Import.css')

const FILES_FOR_IMPORT = [
  'd3data_buden',
  'd3data_ext',
  'd3-data-peoples',
  'cars-data'
]

const FILES_ALREADY_IMPORTED = [
  'h5_a_buden',
  'waterfall',
  'd3-data-peoples',
  'cars-data',
  'bicycle.h5',
  'd3data_buden'
]

class ImportComponent extends React.Component {
  constructor (props) {
    super(props)
    this.api = new Client('/api/internal/')
    this.state = {
      files_for_import: [],
      files_already_imported: [],
    }
  }

  componentDidMount = () => {
    this.getFileLists()
  }

  getFileLists = () => {
    //this.api.get(url).then()
    // this.api.get(url).then(data => {
    //   list = list.concat(data.results)
    //   this.recursiveGetListFromServer(list, data.next, callback)
    // })
    //   .catch(e => this.handleError(e))

    let result = {
      'files_already_imported': FILES_ALREADY_IMPORTED,
      'files_for_import': FILES_FOR_IMPORT
    }

    this.setState({
        files_for_import: result.files_for_import,
        files_already_imported: result.files_already_imported
      }
    )



  }

  render() {
    return (
      <div className="import">
        <div className="files-for-import list">
          <List>
            <Subheader>Файлы для импорта</Subheader>

            { this.state.files_for_import.map((key, index) => (
               <ListItem value={index} primaryText={key} key={key} rightIcon={<ActionImport />} />
            ))
            }

          </List>
        </div>
        <div className="already-imported list">
          <List>
            <Subheader>Импортированные файлы</Subheader>
            {
              this.state.files_already_imported.map((key, index) => (
                <ListItem value={index} primaryText={key} key={key} rightIcon={<ActionDone />} />
            ))
            }

          </List>
        </div>
      </div>
    );
  }
}

ImportComponent.displayName = 'ImportComponent';

// Uncomment properties you need
// ImportComponent.propTypes = {};
// ImportComponent.defaultProps = {};

export default ImportComponent;
