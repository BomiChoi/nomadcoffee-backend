export const processHashtags = (caption) => {
    const categories = caption.match(/#[\w]+/g) || []; // 매치되는 해시태그 없을 경우 빈 배열 반환
    return categories.map(
        name => (
            {
                where: {
                    name
                },
                create: {
                    name,
                    slug: null
                },
            }
        )
    );
};