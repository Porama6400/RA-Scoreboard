import React from 'react';
import './assets/config.module.scss'

import RadioButtons from './radio'

class ConfigTable extends React.Component {
    render() {
        return (
            
            <table>
                <tbody>
                    <tr>
                        <td>test</td>
                        <td><RadioButtons /></td>
                    </tr>
                    <tr>
                        <td>test</td>
                        <td><RadioButtons /></td>

                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ConfigTable;