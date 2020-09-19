import * as React from 'react';
import styles from './Cssreactbarchart.module.scss';
import { ICssreactbarchartProps } from './ICssreactbarchartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { getRandomInt, getRandomFromArray, randomDate, getRandomChance } from '../../../services/randomServices';


import stylesC from './cssChart.module.scss';

export interface ISimpleData {
  title: string;
  value: number;
  perc: number;
}

export function chartData( vals: number[], titles: string[]) {

  const arrSum = vals.reduce((a,b) => a + b, 0);
  let dataArray: ISimpleData[] = [];

  let i = 0;

  vals.map( v => {
    dataArray.push({ 
      title: titles[i],
      value: v,
      perc: v / arrSum * 100,
    });
    i++;
  });

  return dataArray;
}

export default class Cssreactbarchart extends React.Component<ICssreactbarchartProps, {}> {

  private generateVals ( qty ) {
    let vals = [];
    for (let i = 0; i < qty ; i++) {
      vals.push (  getRandomInt(11 , 75) );
    }
    return vals;
  }

  private generateTitles ( lbl: string, qty: number ) {
    let titles = [];
    for (let i = 0; i < qty ; i++) {
      //https://stackoverflow.com/a/3145054
      var chr = String.fromCharCode(65 + i);
      titles.push (  lbl + ' - ' + chr );
    }
    return titles;
  }

  public render(): React.ReactElement<ICssreactbarchartProps> {

    // Styles & Chart code for chart compliments of:  https://codepen.io/richardramsay/pen/ZKmQJv?editors=1010

    let data1 : ISimpleData[] = chartData(this.generateVals(10), this.generateTitles( 'Category', 10 ));

    let data2 : ISimpleData[] = chartData(this.generateVals(10), this.generateTitles( 'Item', 10 ));

    let data3 : ISimpleData[] = chartData(this.generateVals(10), this.generateTitles( 'Product' , 10 ));

    let chart1 = data1.map( d => {
        return <span className={ [stylesC.block, stylesC.innerShadow].join(' ') } style={{ width: (d.perc) + '%'  }} title={ d.title } >
        <span className={ stylesC.value } >{ d.value }%</span>
      </span>;
      });

      let chart2 = data2.map( d => {
        return <span className={ [stylesC.block, stylesC.innerShadow].join(' ') } style={{ width: (d.perc) + '%'  }} title={ d.title } >
        <span className={ stylesC.value } >{ d.value }%</span>
      </span>;
      });

      let chart3 = data3.map( d => {
        return <span className={ [stylesC.block, stylesC.innerShadow].join(' ') } style={{ width: (d.perc) + '%'  }} title={ d.title } >
        <span className={ stylesC.value } >{ d.value }%</span>
      </span>;
      });



    return (
      <div className={ styles.cssreactbarchart }>
        <div className={ styles.container }>
          <figure className={ stylesC.cssChart }>
            <div className={ stylesC.yAxis } >
              <h3>Y-Axis Title</h3>
            </div>

            <div className={ stylesC.graphic } >

              <div className={ stylesC.row } >
                <h6>Bar One</h6>
                <div className={ stylesC.chart } >
                  { chart1 }
                </div>
              </div>

              <div className={ stylesC.row } >
                <h6>Bar Two</h6>
                <div className={ stylesC.chart } >
                  { chart2 }
                </div>
              </div>

              <div className={ stylesC.row } >
                <h6>Bar Three</h6>
                <div className={ stylesC.chart } >
                  { chart3 }
                </div>
              </div>

            </div>

            <div className={ stylesC.xAxis } >
              <h3>X-Axis Title</h3>
              <ul className={ stylesC.legend } >
                <li>Category A</li>
                <li>Category B</li>
                <li>Category C</li>
                <li>Category D</li>
                <li>Category E</li>
                <li>Category F</li>
              </ul>
            </div>

          </figure>
        </div>
      </div>
    );
  }
}


/**
 * 
 *              <div className={ stylesC.row } >
                <h6>Bar Two</h6>
                <div className={ stylesC.chart } >
                  <span className={ stylesC.block} title={ "Category A" } >
                      <span className={ stylesC.value } >29%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category B" } >
                      <span className={ stylesC.value } >21%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category C" } >
                      <span className={ stylesC.value } >19%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category D" } >
                      <span className={ stylesC.value } >6%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category E" } >
                      <span className={ stylesC.value } >19%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category F" } >
                      <span className={ stylesC.value } >6%</span>
                  </span>
                </div>
              </div>


 */