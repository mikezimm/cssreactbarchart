import * as React from 'react';
import styles from './Cssreactbarchart.module.scss';
import { ICssreactbarchartProps } from './ICssreactbarchartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { getRandomInt, getRandomFromArray, randomDate, getRandomChance } from '../../../services/randomServices';

import { ICSSChartSeries } from './IReUsableInterfaces';

import stylesC from './cssChart.module.scss';


/***
 *    d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *      `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *       88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *       88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *      .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                       
 *                                                                                       
 */

export interface ISimpleData {
  title: string;
  value: number;
  perc: number;
}


/***
 *    d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *    88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *    88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *    88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *    88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                  
 *                                                                                  
 */

export function makeChartData( qty: number, label: string ) {

  let randomNums = generateVals(qty);
  let randomTitles = generateTitles( label, qty );
  const arrSum = randomNums.reduce((a,b) => a + b, 0);
  let percents = randomNums.map( v => { return (v / arrSum * 100 ) ; });
  let chartData: ICSSChartSeries = {
    title: label,
    labels: randomTitles,
    counts: randomNums,
    percents: percents,
    totalS: arrSum,
  };
  return chartData;
}


export function generateVals ( qty ) {
  let vals = [];
  for (let i = 0; i < qty ; i++) {
    vals.push (  getRandomInt(55 , 75) );
  }
  return vals;
}

export function generateTitles ( lbl: string, qty: number ) {
  let titles = [];
  for (let i = 0; i < qty ; i++) {
    //https://stackoverflow.com/a/3145054
    var chr = String.fromCharCode(65 + i);
    titles.push (  lbl + ' - ' + chr );
  }
  return titles;
}

export function sortKeysByOtherKey( obj: any, sortKey: string, order: 'asc' | 'dec', dataType: 'number' | 'string', otherKeys: string[]) {

  let sortCopy : number[] | string[] = JSON.parse(JSON.stringify(obj[sortKey]));

  let otherKeyArrays : any = {};
  otherKeys.map( m => { otherKeyArrays[m] = [] ; } );
  if ( order === 'asc' ) {
    sortCopy.sort();
  } else {
    sortCopy.sort((a, b) => { return b-a ;});
  }
  
  
  let x = 0;
  for ( let v of sortCopy) {
    let currentIndex = obj[sortKey].indexOf(v); //Get index of the first sortable value in original array
    let i = 0;
    otherKeys.map( key => {
      otherKeyArrays[key].push( obj[key][currentIndex] );
    });
    obj[sortKey][currentIndex] = null;
    x ++;
  }

  otherKeys.map( key => {
    obj[key] = otherKeyArrays[key] ;
  }); 

  return obj;

}


/***
 *     .o88b. db       .d8b.  .d8888. .d8888. 
 *    d8P  Y8 88      d8' `8b 88'  YP 88'  YP 
 *    8P      88      88ooo88 `8bo.   `8bo.   
 *    8b      88      88~~~88   `Y8b.   `Y8b. 
 *    Y8b  d8 88booo. 88   88 db   8D db   8D 
 *     `Y88P' Y88888P YP   YP `8888Y' `8888Y' 
 *                                            
 *                                            
 */


const chartType: 'bar' | 'other' = 'bar';
const stacked: boolean = false;
const sortStack: 'asc' | 'dec' | false = undefined;
const barValueAsPercent : boolean = false;
const height: number | string = "50px"; //This would be horizonal bar height... one horizontal layer
const barValues: 'counts' | 'sums' | 'avgs' | 'percents' = 'counts';

export default class Cssreactbarchart extends React.Component<ICssreactbarchartProps, {}> {


  /***
   *    d8888b. db    db d8888b. db      d888888b  .o88b.      d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
   *    88  `8D 88    88 88  `8D 88        `88'   d8P  Y8      88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
   *    88oodD' 88    88 88oooY' 88         88    8P           88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
   *    88~~~   88    88 88~~~b. 88         88    8b           88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
   *    88      88b  d88 88   8D 88booo.   .88.   Y8b  d8      88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
   *    88      ~Y8888P' Y8888P' Y88888P Y888888P  `Y88P'      88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
   *                                                                                                            
   *                                                                                                            
   */

  public render(): React.ReactElement<ICssreactbarchartProps> {


    /***
 *    .d8888.  .d8b.  .88b  d88. d8888b. db      d88888b      d8888b.  .d8b.  d888888b  .d8b.  
 *    88'  YP d8' `8b 88'YbdP`88 88  `8D 88      88'          88  `8D d8' `8b `~~88~~' d8' `8b 
 *    `8bo.   88ooo88 88  88  88 88oodD' 88      88ooooo      88   88 88ooo88    88    88ooo88 
 *      `Y8b. 88~~~88 88  88  88 88~~~   88      88~~~~~      88   88 88~~~88    88    88~~~88 
 *    db   8D 88   88 88  88  88 88      88booo. 88.          88  .8D 88   88    88    88   88 
 *    `8888Y' YP   YP YP  YP  YP 88      Y88888P Y88888P      Y8888D' YP   YP    YP    YP   YP 
 *                                                                                             
 *                                                                                             
 */

    // Styles & Chart code for chart compliments of:  https://codepen.io/richardramsay/pen/ZKmQJv?editors=1010

    let chartData: ICSSChartSeries[] = [];

    chartData.push( makeChartData(15, 'Category') ) ;
    chartData.push( makeChartData(15, 'Item') ) ;
    chartData.push( makeChartData(15, 'Product') ) ;

//    console.log('chartData Before: ', chartData );
    if ( stacked === false ) {
      //Re-sort all arrays by same key:

    }

    let stateHeight = stacked === false ? "40px" : height;


    /***
     *    db       .d88b.   .d88b.  d8888b.       .o88b. db   db  .d8b.  d8888b. d888888b .d8888. 
     *    88      .8P  Y8. .8P  Y8. 88  `8D      d8P  Y8 88   88 d8' `8b 88  `8D `~~88~~' 88'  YP 
     *    88      88    88 88    88 88oodD'      8P      88ooo88 88ooo88 88oobY'    88    `8bo.   
     *    88      88    88 88    88 88~~~        8b      88~~~88 88~~~88 88`8b      88      `Y8b. 
     *    88booo. `8b  d8' `8b  d8' 88           Y8b  d8 88   88 88   88 88 `88.    88    db   8D 
     *    Y88888P  `Y88P'   `Y88P'  88            `Y88P' YP   YP YP   YP 88   YD    YP    `8888Y' 
     *                                                                                            
     *                                                                                            
     */


    let charts = chartData.map( cdO => {

      let cd : ICSSChartSeries = null;

      if ( stacked === false || sortStack === 'asc' || sortStack === 'dec' ) {
        let sortOrder : 'asc' | 'dec' = stacked === false || sortStack === 'dec' ? 'dec' : 'asc';
        cd = sortKeysByOtherKey( cdO, barValues, sortOrder, 'number', ['labels',barValues,'percents'] );
      } else {
        cd = cdO;
      }

      let thisChart : any[] = [];
      let maxNumber: number = Math.max( ...cd[barValues] );  //Need to use ... spread in math operators:  https://stackoverflow.com/a/1669222
      let minNumber: number = Math.min( ...cd[barValues] );  //Need to use ... spread in math operators:  https://stackoverflow.com/a/1669222

      let chartRange = maxNumber - minNumber;
      let leftEdgeValue = minNumber - chartRange * .1;
      let rightEdgeValue = maxNumber;


      //      console.log('chartData after: cd', cd );
//      console.log('chartData maxNumber:', maxNumber );

      /***
       *    .88b  d88.  .d8b.  db   dD d88888b      d8888b.  .d8b.  d8888b. .d8888. 
       *    88'YbdP`88 d8' `8b 88 ,8P' 88'          88  `8D d8' `8b 88  `8D 88'  YP 
       *    88  88  88 88ooo88 88,8P   88ooooo      88oooY' 88ooo88 88oobY' `8bo.   
       *    88  88  88 88~~~88 88`8b   88~~~~~      88~~~b. 88~~~88 88`8b     `Y8b. 
       *    88  88  88 88   88 88 `88. 88.          88   8D 88   88 88 `88. db   8D 
       *    YP  YP  YP YP   YP YP   YD Y88888P      Y8888P' YP   YP 88   YD `8888Y' 
       *                                                                            
       *                                                                            
       */
      for ( let i in cd[barValues] ){

        let blockStyle : any = { height: stateHeight , width: ( cd.percents[i] ) + '%'};
        let valueStyle : any = {};
        let barLabel = barValueAsPercent === true ? ( cd.percents[i].toFixed(1) ) + '%' : cd[barValues][i];


        if ( stacked === false ) { 
          let barPercent = ( cd[barValues][i] / maxNumber ) * 100;
          blockStyle.float = 'none' ;
          blockStyle.width = barPercent + '%';
          barLabel += ' - ' + cd.labels[i];
          blockStyle.whiteSpace = 'nowrap';


          if ( barPercent < 50 ) {
//            console.log('chartData barPercent < 50' );
            blockStyle.overflow = 'visible';
            let leftValue = barPercent < 1 ? '7%' : ( 1 + ( 1.2 * barPercent / 100 ) * 100 ) + '%'; 
            valueStyle.left = '20px';
            valueStyle.transform = 'translateX(100%)';
            valueStyle.position = 'relative';
            blockStyle.color = 'black';

          }

        }

//        console.log('chartData valueStyle:', valueStyle );

        thisChart.push(
          <span onClick={ this.onClick.bind(this) }className={ [stylesC.block, stylesC.innerShadow].join(' ') } style={ blockStyle } title={ cd.labels[i] } >
              <span className={ stylesC.value } style={ valueStyle } >{ barLabel }</span>
          </span>
        ) ;
      }

      let chartStyles : any = { lineHeight: stateHeight };
      let rowStyles : any = stacked === false ? { maxWidth: '450px' } : {};

      return <div className={ stylesC.row } style={ rowStyles }>
          <h6 style={ chartStyles }>{ cd.title }</h6>
          <div className={ stylesC.chart } >
            { thisChart }
          </div>
        </div>;

    });

    /***
     *    d8888b. d88888b d888888b db    db d8888b. d8b   db 
     *    88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
     *    88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
     *    88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
     *    88 `88. 88.        88    88b  d88 88 `88. 88  V888 
     *    88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
     *                                                       
     *                                                       
     */

    return (
      <div className={ styles.cssreactbarchart }>
        <div className={ styles.container }>
          <figure className={ stylesC.cssChart }>
            <div className={ stylesC.yAxis } >
              <h3>Chart Title</h3>
            </div>
            <div className={ stylesC.graphic } >
              { charts }
            </div>
          </figure>
        </div>
      </div>
    );
  }


  private onClick(item) {

        //This sends back the correct pivot category which matches the category on the tile.
        let e: any = event;
        let value = 'TBD';
    
        if ( e.target.innerText != '' ) {
          value = e.target.innerText;   
        } else if ( item.currentTarget.innerText != '' ){
          value = item.currentTarget.innerText;
      
        }
    
        console.log('clicked:  ' , value );
        
        this.setState({

        });
  }
  /**   This is the legend code:
   *        <div className={ stylesC.xAxis } >
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
   */


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