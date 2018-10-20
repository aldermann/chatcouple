export default (type, title, image_url, payload) => {
    if (type === 'text')
        return {
            content_type: 'text',
            title: title,
            image_url: image_url,
            payload: payload
        };
};
