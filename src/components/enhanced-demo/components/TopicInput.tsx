
import React from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import { topics, platforms, contentTypes } from "../constants/demoData";

interface TopicInputProps {
  selectedTopic: string;
  selectedPlatform: string;
  selectedTemplate: string;
  onTopicChange: (topic: string) => void;
}

export const TopicInput = ({ selectedTopic, selectedPlatform, selectedTemplate, onTopicChange }: TopicInputProps) => {
  return (
    <div className="space-y-4">
      <div className="p-4 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50">
        <p className="text-gray-700 text-sm mb-2 font-medium">Your Topic:</p>
        <select 
          value={selectedTopic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="w-full p-2 border rounded-lg font-medium bg-white"
        >
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-green-700">Platform: {platforms.find(p => p.id === selectedPlatform)?.name}</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700">Type: {contentTypes.find(t => t.id === selectedTemplate)?.name}</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-purple-700">AI Optimized</span>
        </div>
      </div>
    </div>
  );
};
