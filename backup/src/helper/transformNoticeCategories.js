export const transformNoticeCategories = (data = []) => {
  return data.map((category) => {
    const hasSubItems = Array.isArray(category.child) && category.child.length > 0;


    const subItems = hasSubItems
      ? category.child.map((sub) => sub.name)
      : Array.isArray(category.posts)
      ? category.posts.map((p) => p.name)
      : [];

    return {
      id: category.id,
      slug: category.slug ,
      icon: category?.image,
    //   icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      name: category?.name ,
      subtitle: category?.description , 
      hasSubItems,
      ...(hasSubItems ? { subItems } : { isArrow: true }),
      childs:category?.child
    };
  });
};
