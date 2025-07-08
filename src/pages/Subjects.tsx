
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SubjectCard } from '@/components/SubjectCard';
import { mockSubjects } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';

export default function Subjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredSubjects = mockSubjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'beginner' && subject.strands.some(s => (s.progress || 0) < 30)) ||
                         (selectedFilter === 'intermediate' && subject.strands.some(s => (s.progress || 0) >= 30 && (s.progress || 0) < 70)) ||
                         (selectedFilter === 'advanced' && subject.strands.some(s => (s.progress || 0) >= 70));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">All Subjects</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of subjects. Each subject contains multiple strands 
            with detailed notes and interactive quizzes to help you master every topic.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'beginner' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('beginner')}
              size="sm"
            >
              Beginner
            </Button>
            <Button
              variant={selectedFilter === 'intermediate' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('intermediate')}
              size="sm"
            >
              Intermediate
            </Button>
            <Button
              variant={selectedFilter === 'advanced' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('advanced')}
              size="sm"
            >
              Advanced
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <Badge variant="outline" className="text-sm">
            {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''} found
          </Badge>
        </div>

        {/* Subjects Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No subjects found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
