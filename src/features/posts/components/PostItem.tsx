'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Badge } from '@/src/common/components/ui/badge';
import { Post } from '@/src/common/modules/types/post';
import { Tag } from '@/src/common/modules/types/tag';

interface Props extends Post {
  tags?: Tag[];
}

const PostItem = ({ id, title, description, created_at, tags }: Props) => {
  const router = useRouter();
  const createdAt = dayjs(created_at).format('YYYY-MM-DD');

  const handleClick = async () => {
    router.push(`/post/${id}`);
  };

  return (
    <li
      onClick={handleClick}
      className="group relative cursor-pointer rounded-lg border-2 border-transparent p-2 hover:border-2 hover:border-dashed hover:border-black"
    >
      <div className="relative z-10">
        {tags && (
          <div className="mb-1 flex gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={`${tag}_${index}`}
                variant="outline"
                className="font-light"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="truncate text-lg font-medium dark:text-zinc-100">
          {title}
        </h3>
        <p className="truncate text-zinc-400">{description}</p>
        <p className="mt-2 text-sm text-zinc-400">{createdAt}</p>
      </div>
    </li>
  );
};

export default PostItem;
