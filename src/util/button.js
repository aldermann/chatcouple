export default (type, content, title) => {
    return {
        type: type,
        [type === 'web_url' ? 'url' : 'payload']: content,
        title: title
    };
};
