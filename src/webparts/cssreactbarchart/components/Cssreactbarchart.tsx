import * as React from 'react';
import styles from './Cssreactbarchart.module.scss';
import { ICssreactbarchartProps } from './ICssreactbarchartProps';
import { ICssreactbarchartState } from './ICssreactbarchartState';

import { escape } from '@microsoft/sp-lodash-subset';

import { getRandomInt, getRandomFromArray, randomDate, getRandomChance } from '../../../services/randomServices';

import { addDaysToDate } from '../../../services/dateServices';

import { ICSSChartSeries } from './IReUsableInterfaces';

import stylesC from './cssChart.module.scss';
import { Toggle } from 'office-ui-fabric-react';

export interface ISimpleData {
  title: string;
  value: number;
  perc: number;
}

export function makeChartData( qty: number, label: string ) {

  let randomNums = generateVals(qty);
  let randomTitles = generateTitles( label, qty );
  const arrSum = randomNums.reduce((a,b) => a + b, 0);
  let percents = randomNums.map( v => { return (v / arrSum * 100 ) ; });
  let randomStarts = [];
  for ( let i = 0 ; i < qty ; i++ ) {
    randomStarts.push( randomDate(new Date(2018, 3, 15), new Date(2024, 7, 21) ).getTime() );
  }
  let randomEnds = randomStarts.map( s => {
    return ( addDaysToDate(s, getRandomInt(100 , 300) ).getTime() );
  });

  let chartData: ICSSChartSeries = {
    title: label,
    labels: randomTitles,
    counts: randomNums,
    starts: randomStarts,
    ends: randomEnds,
    percents: percents,
    totalS: arrSum,
  };
  return chartData;
}


export function generateVals ( qty ) {
  let vals = [];
  for (let i = 0; i < qty ; i++) {
    vals.push (  getRandomInt(11 , 75) );
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

const chartType: 'bar' | 'other' = 'bar';
const stacked: boolean = false;
const sortStack: 'asc' | 'dec' | false = undefined;
const barValueAsPercent : boolean = false;
const height: number | string = "50px"; //This would be horizonal bar height... one horizontal layer
const barValues: 'counts' | 'sums' | 'avgs' | 'percents' | 'starts' | 'ends' = 'counts';

export default class Cssreactbarchart extends React.Component<ICssreactbarchartProps, ICssreactbarchartState> {

  public constructor(props:ICssreactbarchartProps){
    super(props);

      // Styles & Chart code for chart compliments of:  https://codepen.io/richardramsay/pen/ZKmQJv?editors=1010

      let chartData: ICSSChartSeries[] = [];

      chartData.push( makeChartData(30, 'Category') ) ;
//      chartData.push( makeChartData(10, 'Item') ) ;
//      chartData.push( makeChartData(10, 'Product') ) ;

      console.log('constructor chartData: ', chartData );

      let startDate = new Date(2020, 0, 1);
      let endDate = new Date(2020, 11, 31);

    this.state = { 
      chartData: chartData,
      toggle: true,
      startTime: startDate.getTime(),
      endTime: endDate.getTime(),
      startLocal: startDate.toDateString(),
      endLocal: endDate.toDateString(),
      rangeTime: endDate.getTime() - startDate.getTime(),
    };

// because our event handler needs access to the component, bind 
//  the component to the function so it can get access to the
//  components properties (this.props)... otherwise "this" is undefined
// this.onLinkClick = this.onLinkClick.bind(this);

}

  public componentDidMount() {
    console.log('Mounted!');
  }

  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */



 
/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */


  public render(): React.ReactElement<ICssreactbarchartProps> {

    //console.log('chartData Before: ', this.state.chartData );
    if ( stacked === false ) {
      //Re-sort all arrays by same key:

    }

    let stateHeight = stacked === false ? "40px" : height;

    let charts = this.state.chartData.map( cdO => {

      let cd : ICSSChartSeries = null;

      if ( stacked === false || sortStack === 'asc' || sortStack === 'dec' ) {
        let sortOrder : 'asc' | 'dec' = stacked === false || sortStack === 'dec' ? 'dec' : 'asc';
        cd = sortKeysByOtherKey( cdO, barValues, sortOrder, 'number', ['labels',barValues,'percents'] );
      } else {
        cd = cdO;
      }

      //console.log('chartData after: cd', cd );

      /**
       * To indent bar and label:
       * set .block and .arrowLeft to be the % shift to right
       * if you indent more than 50%, the label should be on the left of the arrow.
       * 
       * Probably the best approach, would be to figure out:
       * left % (indent), size % on screen, right % (white space), then put label in biggest block
       * Or if the visible bar is >= 50% of the screen, put in bar... then look at above scenario if needed.
       * Another scenario:  if the bar goes off the screen but visible bar is > 50% of the screen, shift label left.
       */
      let thisChart : any[] = [];
      let maxNumber: number = Math.max( ...cd[barValues] );  //Need to use ... spread in math operators:  https://stackoverflow.com/a/1669222

      for ( let i in cd['starts'] ){


        //Roadmap calculations
        //LABEL Dates
        let thisStart = new Date(cd['starts'][i]);// Milliseconds to date
        let startLabel = thisStart.toLocaleDateString();
        let thisEnd = new Date(cd['ends'][i]);// Milliseconds to date
        let endLabel = thisEnd.toLocaleDateString();

        let barLabel = startLabel + ' - ' + endLabel;

        let thisTitle = cd.labels[i] + ': ' + barLabel;

        //BAR PERCENTS  0% = Timeline Start,  100% = Timeline End
        let startPercent = 100* ( cd['starts'][i] - this.state.startTime ) / this.state.rangeTime ;
        let endPercent = 100* ( cd['ends'][i] - this.state.startTime ) / this.state.rangeTime;

        let isVisible = true;
        if ( startPercent > 100 ) { isVisible = false; } //start% > 100 means bar is to right of window
        if ( endPercent <  0 ) { isVisible = false; } //end% > 100 means bar is to left of window

        let thisBarPercent = ( endPercent - startPercent );
        let barGapLeft = isVisible === true ? startPercent < 0 ? 0 : startPercent : null;  // barGapLeft
        let barGapRight = isVisible === true ? endPercent > 100 ? 0 : 100 - endPercent : null;    
        let visBarPercent = isVisible === true ? 100 - barGapRight - barGapLeft : 0 ;

        let biggestVisiblePercent = '';
        let maxBar = Math.max(...[barGapLeft, barGapRight, visBarPercent]);
        switch ( maxBar ) {
          case barGapRight:
            biggestVisiblePercent = 'barGapRight';
            break;
          case barGapLeft:
            biggestVisiblePercent = 'barGapLeft';
            break;
          default:
            biggestVisiblePercent ='visBarPercent';
        }
        let fullyContained = startPercent >= 0 && endPercent <= 100 ? true : false;
        let fullyOutside = isVisible === false ? true : false;
        let shiftedLeft = isVisible === true && startPercent < 0 ? true : false;
        let shiftedRight = isVisible === true && endPercent > 100 ? true : false;  
        let currentFit = fullyContained ? 'fullyContained' : fullyOutside ? 'fullyOutside' : shiftedLeft ? 'shiftedLeft' : 'shiftedRight'

        let message = barLabel + ' : CurrentFit = ' + currentFit;
        console.log('message: ' , message );

        //if ( cd['starts'][i] >= this.state.startTime && cd['starts'][i] <= this.state.endTime) { isVisible = true; }
        //if ( cd['ends'][i] >= this.state.startTime && cd['ends'][i] <= this.state.endTime) { isVisible = true; }


//        console.log('biggestPercent', biggestPercent, startPercent, endPercent, thisBarPercent );

        let showOrHide = isVisible === true ? stylesC.showBar : stylesC.hideBar;

        let labelClass = stylesC.valueCenterBar;
        let blockStyle : any = { height: stateHeight , width: ( thisBarPercent ) + '%'};
        let valueStyle : any = {};

        //cd[barValues][i] +=  getRandomInt(-20,20);
        //if ( cd[barValues][i] < 5 ) { cd[barValues][i] = getRandomInt(5,50) ; }

        //let barLabel = barValueAsPercent === true ? ( thisBarPercent.toFixed(1) ) + '%' : cd[barValues][i];
        //let barPercent = 50;

      
        let arrowRight = <div className={ stylesC.arrowRight } style={{ borderLeft: '50px solid transparent' }}></div>;
        let arrowLeft = <div className={ [stylesC.arrowLeft,  ].join(' ') } style={{ borderLeft: '50px solid transparent', left: startPercent + '%' }}></div>;
        let theChart = null;

        if ( stacked === false ) { 
          blockStyle.float = 'none' ;
          blockStyle.width = thisBarPercent + '%';
          blockStyle.left = startPercent + '%';
          blockStyle.whiteSpace = 'nowrap';
          blockStyle.backgroundColor = '#E27A3F';

          if ( biggestVisiblePercent === 'visBarPercent' ) {

            theChart =
            <span id={ cd.labels[i] } className={ [stylesC.block, stylesC.innerShadow, ].join(' ') } style={ blockStyle } >
                 <span className={ labelClass } style={ valueStyle } >{ barLabel }</span> { arrowRight }
            </span>;

          } else if ( biggestVisiblePercent === 'barGapRight' ) {
            labelClass = stylesC.valueRightBar;
            blockStyle.overflow = 'visible';
            let labelPadRightArrow = thisBarPercent < 1 ? '15%' : ( 1 + 7 / thisBarPercent ) * 100 + '%'; // Logic:  1 + y/x where x is the % of the bar, y is the % to the right of the bar you want the label
            valueStyle.left = labelPadRightArrow;
            blockStyle.color = 'black';

            theChart =
            <span id={ cd.labels[i] } className={ [stylesC.block, stylesC.innerShadow, ].join(' ') } style={ blockStyle } >
                 <span className={ labelClass } style={ valueStyle } >{ barLabel }</span> { arrowRight }
            </span>;            
            

          } else if ( biggestVisiblePercent === 'barGapLeft' ) {
          
            labelClass = stylesC.valueLeftBar;
            blockStyle.overflow = 'visible';
            blockStyle.top = '-1em';
            arrowLeft = <div className={ [stylesC.arrowLeft,  ].join(' ') } style={{ top: '-54px' , borderLeft: '50px solid transparent', left: startPercent + '%' }}></div>;

            let barLabelSpan = <span className={ labelClass } style={ valueStyle } >{ barLabel }</span>;
            let theBar = <span>
                  <span id={ cd.labels[i] } className={ [stylesC.block, stylesC.innerShadow, ].join(' ') } style={ blockStyle } >
                        { arrowRight }
                  </span>
              </span>;
              theChart = [];
              theChart.push(barLabelSpan);
              theChart.push(theBar);             

          } else {
            alert('Not sure where to put the label for this one: ' + barLabel );
          }

        }

        if ( stacked === false ) {
            //Adding left to this div does nothing.
            theChart = <div title={ thisTitle } className= { showOrHide } style= {{ }} onClick= { this.onclick.bind(this) } >{ theChart } { arrowLeft }</div>;
        }

        thisChart.push( theChart ) ;
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

    return (
      <div className={ styles.cssreactbarchart }>
        <div className={ styles.container }>
          <figure className={ stylesC.cssChart }>
            <div className={ '' } >
            <h3> { this.state.startLocal + ' - ' + this.state.endLocal }</h3>
            </div>
            <div className={ stylesC.graphic } >
              { charts }
            </div>
          </figure>
        </div>
      </div>
    );
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
  private onclick = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    let value = 'TBD';

    if ( e.target.innerText != '' ) {
      value = e.target.innerText;   
    } else if ( item.currentTarget.innerText != '' ){
      value = item.currentTarget.innerText;
  
    }

    /**
     * 
     *     This is used to get random yyyy-mm for the date range.
    let startYear = getRandomInt(2019,2022);
    let startMonth = getRandomInt(0, 11);
    let endYear = startMonth === 11 ? getRandomInt(startYear + 1, 2022 + 1) : getRandomInt(startYear, 2022 + 1) ; 
    let endMonth = startYear === endYear ? getRandomInt(startMonth + 1 , 11 ) : getRandomInt( 0 , 11 ) ;
 
     */
   
    let startYear = getRandomInt(2019,2022);
    let startMonth = 0;
    let endYear = startYear; 
    let endMonth = 11 ;


    let endDayOfMonth = new Date(endYear, endMonth + 1, 0).getDate();

    let startDate = new Date( startYear, 0, 1 );
    let endDate = new Date(endYear, endMonth, endDayOfMonth);
    let startLocal= startYear + '-' + ( startMonth + 1);
    let endLocal= endYear + '-' + ( endMonth + 1);

    console.log('Start End:', startLocal, endLocal );
    console.log('Clicked Value:', value );
    this.setState({
      startTime: startDate.getTime(),
      endTime: endDate.getTime(),
      startLocal: startLocal,
      endLocal: endLocal,
      rangeTime: endDate.getTime() - startDate.getTime(),
    });
    //e.target.innerText or e.target.id gives info about the item clicked.
    //alert('Hi! You clicked: ' + value);


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