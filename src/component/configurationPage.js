import { $ } from 'jquery';
import { component } from '../class/component'
import { statsTools } from '../class/statsTools'
import htmlContent from './configurationPage.html?raw';

export class configurationPage extends component
{
    constructor(activities) {
        super();
    }
    setHrZones() {
        let hrmax = $('#txtFCMax').val()*1;
        let zones = statsTools.getZonesFromFCMax(hrmax);
        let i=1;
        while(i<6) {
            $('#minZ'+i).text(zones['z' + i + '_Min']);
            $('#maxZ'+i).text(zones['z' + i + '_Max']);
            i++;
        }
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
            // TODO
            $('#btnValidateConfig').click(() => {
                this.setHrZones();
            });
            this.setHrZones();
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
}