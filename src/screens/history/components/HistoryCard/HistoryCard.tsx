import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import moment from 'moment';
import FastImage from 'react-native-fast-image';

import { IconButtonV2 } from '../../../../components';

import { parseChapterNumber } from '../../../../utils/parseChapterNumber';

import { History } from '../../../../database/types';
import { ThemeType } from '../../../../theme/types';
import { coverPlaceholderColor } from '../../../../theme/colors';

interface HistoryCardProps {
  history: History;
  handleNavigateToChapter: (
    sourceId: number,
    novelId: number,
    novelName: string,
    chapterId: number,
    chapterUrl: string,
    chapterName: string,
    isBookmarked: number,
  ) => void;
  handleRemoveFromHistory: (historyId: number) => void;
  handleNavigateToNovel: (
    sourceId: number,
    novelId: number,
    novelUrl: string,
    novelName: string,
    novelCover: string,
  ) => void;
  theme: ThemeType;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  history,
  handleNavigateToChapter,
  handleRemoveFromHistory,
  handleNavigateToNovel,
  theme,
}) => {
  const {
    historyId,
    sourceId,
    novelId,
    novelName,
    novelUrl,
    chapterId,
    chapterName,
    novelCover,
    historyTimeRead,
    chapterUrl,
    bookmark,
  } = history;

  const chapterNoAndTime = useMemo(
    () =>
      `Chapter ${parseChapterNumber(chapterName)} • ${moment(historyTimeRead)
        .format('h:mm a')
        .toUpperCase()}`,
    [chapterName, historyTimeRead],
  );

  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: theme.rippleColor }}
      onPress={() =>
        handleNavigateToNovel(
          sourceId,
          novelId,
          novelUrl,
          novelName,
          novelCover,
        )
      }
    >
      <View style={styles.imageAndNameContainer}>
        <FastImage source={{ uri: novelCover }} style={styles.cover} />
        <View style={styles.detailsContainer}>
          <Text
            numberOfLines={2}
            style={[{ color: theme.textColorPrimary }, styles.novelName]}
          >
            {novelName}
          </Text>
          <Text style={{ color: theme.textColorSecondary }}>
            {chapterNoAndTime}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <IconButtonV2
          name="delete-outline"
          theme={theme}
          onPress={() => handleRemoveFromHistory(historyId)}
        />
        <IconButtonV2
          name="play"
          onPress={() =>
            handleNavigateToChapter(
              sourceId,
              novelId,
              novelName,
              chapterId,
              chapterUrl,
              chapterName,
              bookmark,
            )
          }
          theme={theme}
        />
      </View>
    </Pressable>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cover: {
    height: 80,
    width: 56,
    borderRadius: 4,
    backgroundColor: coverPlaceholderColor,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  novelName: {
    marginBottom: 4,
  },
  chapterName: {},
  imageAndNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
