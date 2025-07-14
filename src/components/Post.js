import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Post({ post }) {
  return (
    <View style={styles.card}>
      {/* Header: User Info */}
      <View style={styles.header}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.views}>22M views</Text>
        </View>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Icon name="ellipsis-horizontal" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof post.image === 'string' ? { uri: post.image } : post.image}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>


      {/* Action Icons */}
      {/* <View style={styles.actions}>
        <View style={styles.leftIcons}>
          <Icon name="heart-outline" size={28} color="#000" style={styles.icon} />
          <Icon name="chatbubble-outline" size={28} color="#000" style={styles.icon} />
          <Icon name="paper-plane-outline" size={28} color="#000" />
        </View>
        {/* <Icon name="bookmark-outline" size={24} color="#000" /> */}
      {/* <Icon name="download-outline" size={28} color="#000" /> */}
      {/* </View>  */}
      
      <View style={styles.actions}>
        <View style={styles.leftIcons}>
          <View style={styles.iconWithCount}>
            <Icon name="heart-outline" size={32} color="#000" />
            <Text style={styles.iconCount}>{post.likes || '2.4k'}</Text>
          </View>
          <View style={styles.iconWithCount}>
            <Icon name="chatbubble-outline" size={32} color="#000" />
            <Text style={styles.iconCount}>{post.comments || '1.2k'}</Text>
          </View>
          <View style={styles.iconWithCount}>
            <Icon name="paper-plane-outline" size={32} color="#000" />
            <Text style={styles.iconCount}>{post.shares || '500'}</Text>
          </View>
        </View>
        <View style={styles.iconWithCount}>
          <Icon name="download-outline" size={32} color="#000" />
          <Text style={styles.iconCount}>{post.downloads || '300'}</Text>
        </View>
      </View>


      <Text style={styles.caption}>
        <Text style={styles.captionUsername}>{post.username} </Text>
        {post.caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    backgroundColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 70,
  },
  likes: {
    fontWeight: 'bold',
    paddingHorizontal: 12,
    fontSize: 14,
    marginTop: -5,
  },
  caption: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    fontSize: 13,
    color: '#333',
  },
  captionUsername: {
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: 400, // fixed height - adjust as needed
    backgroundColor: '#ccc',
  },

  postImage: {
    width: '100%',
    height: '100%',
  },
  views: {
    fontSize: 12,
    color: '#888',
  },
  iconWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },

  iconCount: {
    marginLeft: 4,
    fontSize: 20,
    color: '#555',
  },
});
