'use client';
import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import type { Category } from '@/lib/types';
import { number } from '@/lib/text';
import { Icon } from './icon';

export function CategoryCard({ category, featured = false }: { category: Category; featured?: boolean }) {
  return <Link href={`/azkar/${category.id}`} className={`category-card ${featured ? 'featured-card' : ''} ${category.id === 'evening' || category.id === 'sleep' ? 'cool-card' : ''}`}>
    <div className="category-top"><span className="category-icon"><Icon name={category.icon} size={25} /></span><span className="category-count">{number(category.count)} نصًا</span></div>
    <h3>{category.title}</h3>
    {featured && <p>{category.description}</p>}
    <span className="card-arrow" aria-hidden="true"><ArrowUpLeft size={19} /></span>
  </Link>;
}
