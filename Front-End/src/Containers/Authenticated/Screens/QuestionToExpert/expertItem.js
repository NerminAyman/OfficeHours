import React, { Component } from 'react';
import Accordion from 'grommet/components/Accordion';
import AccordionItem from '../../Components/Accordion';

class ExpertItem extends Component {
  constructor() {
    super();
    this.state = {
      experts: []
    };
  }

  render() {
    let items;
    if (this.props.experts) {
      items = this.props.experts.map(
        theExpert =>
          <div key={theExpert.id}>
            <Accordion animate={true} openMulti={false}>
              {AccordionItem({
                title: theExpert.name,
                description: <div><b>{theExpert.field}</b></div>,
                content: <div>
                  <table>
                    <tbody>
                      <tr>Name        : {theExpert.name}</tr>
                      <tr>Field       : {theExpert.field}</tr>
                      <tr>Description : {theExpert.description}</tr>
                      <tr>Email       : {theExpert.email}</tr>
                    </tbody>
                  </table>
                </div>
              })}
            </Accordion>
          </div>
      );
    }
    return (
      <div>
        {items}
      </div>);
  }
}

export default ExpertItem;
