'use strict'

import React from 'react'
import ActionDone from 'material-ui/svg-icons/action/done'
import ActionImport from 'material-ui/svg-icons/communication/import-export'
import {List, ListItem, makeSelectable} from 'material-ui/List'

import Subheader from 'material-ui/Subheader'
import Client from '../containers/Client'

let SelectableList = makeSelectable(List);

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

  handleChangeForImport = (event, index) =>  {
    let is_importing = confirm('Начать импортирование файла ' +  index + '?');
    if (is_importing) {
      console.log('File importing')
      //post запрос и, возможно, отображение процесса импорта
    }
  }

  handleChangeAlreadyImported = (event, index) => {
    let is_redirecting = confirm('Перейти на страницу с разметкой файла ' +  index + '?');
    if (is_redirecting) {
      console.log('Redirecting')
     // Router.browserHistory.push('/somepath');
      //post запрос и, возможно, отображение процесса импорта
    }

  }

  render() {
    return (
      <div className="import">
        <div className="files-for-import list">
          <SelectableList onChange={this.handleChangeForImport}>
            <Subheader>Файлы для импорта</Subheader>

            { this.state.files_for_import.map((key, index) => (
               <ListItem value={key} primaryText={key} key={index} rightIcon={<ActionImport />} />
            ))
            }

          </SelectableList>
        </div>
        <div className="already-imported list">
          <SelectableList onChange={this.handleChangeAlreadyImported}>
            <Subheader>Импортированные файлы</Subheader>
            {
              this.state.files_already_imported.map((key, index) => (
                <ListItem value={key} primaryText={key} key={index} rightIcon={<ActionDone />} />
            ))
            }

          </SelectableList>
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
