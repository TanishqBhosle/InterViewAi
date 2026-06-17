"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { Trophy, ChevronRight } from "lucide-react";

interface CompanyTrack {
  id: string;
  slug: string;
  name: string;
  description: string;
  problemCount: number;
  avgDifficulty: string;
  strategy: string;
}

export default   function DSACompaniesPage() {
  const [tracks, setTracks] = useState<CompanyTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<CompanyTrack[]>("/dsa/companies");
        if (res.success && res.data) setTracks(res.data);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const companyColors: Record<string, string> = {
    google: "#4285F4",
    amazon: "#FF9900",
    microsoft: "#00A4EF",
    meta: "#0668E1",
    apple: "#555555",
    netflix: "#E50914",
    uber: "#000000",
    adobe: "#FF0000",
    flipkart: "#2874F0",
    atlassian: "#0052CC",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Tracks</h1>
        <p className="text-muted-foreground">Company-specific problem sets for targeted preparation</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <Link key={track.id} href={`/dsa/companies/${track.slug}`}>
              <Card className="border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-all cursor-pointer group h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: companyColors[track.slug] || "#6B7280" }}
                      >
                        {track.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {track.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{track.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground mt-1" />
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <Badge variant="secondary">{track.problemCount} problems</Badge>
                    <Badge variant="outline">{track.avgDifficulty}</Badge>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{track.strategy}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
