
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Subject } from '@/types';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, HelpCircle } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const navigate = useNavigate();
  
  const totalNotes = subject.strands.reduce((acc, strand) => 
    acc + strand.subStrands.reduce((subAcc, subStrand) => subAcc + subStrand.notes.length, 0), 0
  );
  
  const totalQuizzes = subject.strands.reduce((acc, strand) => 
    acc + strand.subStrands.reduce((subAcc, subStrand) => subAcc + subStrand.quizzes.length, 0), 0
  );

  const averageProgress = subject.strands.reduce((acc, strand) => acc + (strand.progress || 0), 0) / subject.strands.length;

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in border-l-4 border-l-primary"
      onClick={() => navigate(`/subjects/${subject.id}`)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
              {subject.icon}
            </div>
            <div>
              <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                {subject.name}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-1">{subject.strands.length} strands</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {Math.round(averageProgress)}% complete
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          {subject.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Overall Progress</span>
            <span>{Math.round(averageProgress)}%</span>
          </div>
          <Progress value={averageProgress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>{totalNotes} notes</span>
            </div>
            <div className="flex items-center space-x-1">
              <HelpCircle className="w-4 h-4" />
              <span>{totalQuizzes} quizzes</span>
            </div>
          </div>
          <div className="text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
            Explore →
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
