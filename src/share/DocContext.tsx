import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { IDoc } from '../redux/apis/docApi';

interface DocContextType {
  selectedData: IDoc | null;
  setSelectedData: React.Dispatch<React.SetStateAction<IDoc | null>>;
}

const DocContext = createContext<DocContextType | undefined>(undefined);

interface DocProviderProps {
  children: ReactNode;
}

export const DocProvider: React.FC<DocProviderProps> = ({ children }) => {
  const loadSelectedDataFromStorage = (): IDoc | null => {
    const storedData = localStorage.getItem('selectedData');
    return storedData ? JSON.parse(storedData) : null;
  };

  const [selectedData, setSelectedData] = useState<IDoc | null>(loadSelectedDataFromStorage);

  useEffect(() => {
    if (selectedData) {
      localStorage.setItem('selectedData', JSON.stringify(selectedData));
    } else {
      localStorage.removeItem('selectedData'); 
    }
  }, [selectedData]);

  return (
    <DocContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </DocContext.Provider>
  );
};

// Custom hook to access the context
export const useDoc = (): DocContextType => {
  const context = useContext(DocContext);
  if (!context) {
    throw new Error('useDoc must be used within a DocProvider');
  }
  return context;
};
