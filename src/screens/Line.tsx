import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {Text as TextSVG} from 'react-native-svg';
import {observer} from 'mobx-react';

const LineScreen = observer(
  ({data: expenses}: {data: {[key: string]: number}}) => {
    const values = Object.entries(expenses).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
    );
    const dateList = values.map(item => item[0]);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    const priceList = values.map(item => item[1]);
    const data = {
      labels: [
        '',
        ...dateList.map(
          item =>
            `${new Date(item).getDate()} ${
              monthNames[new Date(item).getMonth()]
            }`,
        ),
        '',
      ],
      datasets: [
        {
          data: [
            0,
            ...priceList,
            Math.min(...priceList) > 0 ? 0 : Math.min(...priceList),
          ],
        },
      ],
    };
    const screenWidth = Dimensions.get('screen').width - 20;
    const chartConfig = {
      backgroundGradientFrom: '#e1f8ff',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#ffc290',
      backgroundGradientToOpacity: 0,
      color: () => '#000', // optional
      strokeWidth: 1.5, // optional
      useShadowColorFromDataset: true, // optional
      propsForBackgroundLines: {
        strokeWidth: 1.5, // optional
        strokeDasharray: '', // solid background lines with no dashes
      },
      propsForLabels: {
        fontSize: 10,
        fontFamily: 'Karla-Medium',
      },
    };
    return (
      <LinearGradient
        colors={['#e1f8ff', '#ffc290']}
        style={{borderRadius: 20, height: 230}}>
        <View
          style={{
            height: 230,
            width: '100%',
          }}>
          <Text style={styles.expenseText}>Expense Value</Text>
          <Text style={styles.dateText}>Dates</Text>
          <LineChart
            style={{
              borderRadius: 10,
              position: 'absolute',
              top: 20,
              left: -30,
            }}
            verticalLabelRotation={30}
            data={data}
            width={screenWidth}
            height={190}
            fromZero={true}
            withInnerLines={false}
            bezier={dateList.length <= 1}
            xLabelsOffset={-10}
            withHorizontalLabels={false}
            hidePointsAtIndex={[0, data.labels.length - 1]}
            renderDotContent={({x, y, indexData, index}) => {
              return (
                <TextSVG
                  key={index}
                  x={x + 5}
                  y={y - 5}
                  fill="black"
                  fontSize={12}
                  fontFamily="Karla-Regular">
                  ₹ {indexData}
                </TextSVG>
              );
            }}
            chartConfig={chartConfig}
          />
        </View>
      </LinearGradient>
    );
  },
);

export default LineScreen;

const styles = StyleSheet.create({
  expenseText: {
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
    top: '45%',
    left: '-7%',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  dateText: {
    position: 'absolute',
    top: '92%',
    left: '48%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#000',
  },
});
