import Employee from "./Employee";

export default interface EmployeeDto extends Employee {
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}