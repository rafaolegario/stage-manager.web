import { InternDTO } from "../@types/intern";

export function calculateAttendance(intern: InternDTO, totalWorkingDays = 22): number {
    if (totalWorkingDays <= 0) return 0;
  
    const lateness = Math.max(0, intern.lateness);
    const absences = Math.max(0, intern.absent);
  
    // 3 atrasos = 1 falta
    const extraAbsencesFromLateness = Math.floor(lateness / 3);
    const totalAbsences = absences + extraAbsencesFromLateness;
  
    const presentDays = Math.max(0, totalWorkingDays - totalAbsences);
    const attendanceRate = presentDays / totalWorkingDays;
  
    return Math.round(attendanceRate * 100);
  }
  