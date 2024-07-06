// src/components/DepartmentList.tsx
import React, { useState } from 'react';
import { departments } from '../data/departments';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggle = (department: string) => {
    setExpanded(expanded === department ? null : department);
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      const updatedSelection = selectedDepartments.includes(subDepartment)
        ? selectedDepartments.filter((dep) => dep !== subDepartment)
        : [...selectedDepartments, subDepartment];
      setSelectedDepartments(updatedSelection);
    } else {
      const subDepartments = departments.find((dep) => dep.department === department)?.sub_departments || [];
      const isAllSelected = subDepartments.every((sub) => selectedDepartments.includes(sub));

      const updatedSelection = isAllSelected
        ? selectedDepartments.filter((dep) => !subDepartments.includes(dep))
        : [...selectedDepartments, ...subDepartments.filter((sub) => !selectedDepartments.includes(sub))];

      setSelectedDepartments(updatedSelection);
    }
  };

  return (
    <List>
      {departments.map((dept) => (
        <div key={dept.department}>
          <ListItem button onClick={() => handleToggle(dept.department)} sx={{ border: '1px solid black', marginBottom: '0.6px' }}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={dept.sub_departments.every((sub) => selectedDepartments.includes(sub))}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(dept.department);
                }}
              />
            </ListItemIcon>
            <ListItemText primary={dept.department} />
            {expanded === dept.department ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
            <Collapse in={expanded === dept.department} timeout="auto" unmountOnExit>
                {dept.sub_departments.map((subDept) => (
                <ListItem key={subDept} button onClick={() => handleSelect(dept.department, subDept)}>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={selectedDepartments.includes(subDept)}
                        onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(dept.department, subDept);
                        }}
                    />
                    </ListItemIcon>
                    <ListItemText primary={subDept} />
                </ListItem>
                ))}
            </Collapse>
        </div>
        ))}
    </List>
    );
}

export default DepartmentList;