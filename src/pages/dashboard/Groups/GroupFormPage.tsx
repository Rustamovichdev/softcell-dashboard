import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type FC } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Button from "../../../components/ui/Button";
import { MOCK_STUDENTS, getFullName } from "../Students/data";
import { CUSTOM_TEACHER, DIRECTIONS, GROUP_TEACHERS, TIME_PRESETS, scheduleTypeLabels } from "./data";
import { useGroupsStore } from "./store";
import { MAX_STUDENTS_PER_GROUP, type GroupFormValues } from "./types";

const groupSchema = z.object({
  name: z.string().min(2, "Guruh nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  direction: z.enum(DIRECTIONS),
  teacherId: z.string(),
  teacherName: z.string(),
  scheduleType: z.enum(["even", "odd", "daily"]),
  time: z.string().min(4, "Dars vaqtini kiriting"),
  startDate: z.string().min(1, "Boshlanish sanasini kiriting"),
  endDate: z.string().min(1, "Tugash sanasini kiriting"),
  payment: z.coerce.number().min(0, "To'lov 0 dan kam bo'lmasligi kerak"),
  lessonCount: z.coerce.number().min(1, "Darslar soni 1 dan kam bo'lmasligi kerak").max(200),
  link: z.string(),
});

const fieldClassName =
  "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";
const labelClassName = "text-xs font-medium text-gray-600 sm:text-sm";

/** Forma maydonlari (students alohida state'da boshqariladi) */
type GroupFormFields = Omit<GroupFormValues, "students">;

/** Autocomplete ro'yxati id'si */
const STUDENT_SUGGESTIONS_ID = "groups-student-suggestions";

const GroupFormPage: FC = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const groups = useGroupsStore((state) => state.groups);
  const addGroup = useGroupsStore((state) => state.addGroup);
  const updateGroup = useGroupsStore((state) => state.updateGroup);
  const editingGroup = groupId ? groups.find((g) => g.id === Number(groupId)) : undefined;
  const [studentInput, setStudentInput] = useState("");
  const [studentError, setStudentError] = useState("");
  const [students, setStudents] = useState<string[]>(editingGroup?.students ?? []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GroupFormFields>({
    resolver: zodResolver(groupSchema) as unknown as Resolver<GroupFormFields>,
    defaultValues: {
      name: "",
      direction: "English",
      teacherId: "",
      teacherName: "",
      scheduleType: "even",
      time: "18:00",
      startDate: "",
      endDate: "",
      payment: 0,
      lessonCount: 24,
      link: "",
    },
  });

  const teacherId = watch("teacherId");
  const time = watch("time");
  const scheduleType = watch("scheduleType");

  const addStudent = () => {
    const name = studentInput.trim();
    if (students.length >= MAX_STUDENTS_PER_GROUP) {
      setStudentError(`Guruhga ko'pi bilan ${MAX_STUDENTS_PER_GROUP} ta student qo'shiladi`);
      return;
    }
    if (name.length < 2) {
      setStudentError("Student ismini kamida 2 ta belgi bilan yozing");
      return;
    }
    setStudentError("");
    setStudents([...students, name]);
    setStudentInput("");
  };

  const removeStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!editingGroup) return;
    setValue("name", editingGroup.name);
    setValue("direction", editingGroup.direction);
    setValue("teacherId", editingGroup.teacherId ?? "");
    setValue("teacherName", editingGroup.teacherName ?? "");
    setValue("scheduleType", editingGroup.scheduleType);
    setValue("time", editingGroup.time);
    setValue("startDate", editingGroup.startDate);
    setValue("endDate", editingGroup.endDate);
    setValue("payment", editingGroup.payment);
    setValue("lessonCount", editingGroup.lessonCount);
    setValue("link", editingGroup.link);
  }, [editingGroup, setValue]);

  const onSubmit = (values: GroupFormFields) => {
    const isCustom = values.teacherId === CUSTOM_TEACHER;
    const payload: GroupFormValues = {
      ...values,
      students,
      // Ro'yxatdan tanlangan ustoz id'si saqlanadi, qo'lda yozilgani esa ism sifatida
      teacherId: isCustom || !values.teacherId ? null : values.teacherId,
      teacherName: isCustom ? values.teacherName.trim() : "",
    };
    if (editingGroup) {
      updateGroup(editingGroup.id, payload);
      navigate(`/groups/${editingGroup.id}`);
    } else {
      const newId = addGroup(payload);
      navigate(`/groups/${newId}`);
    }
  };

  const onCancel = () => {
    if (editingGroup) navigate(`/groups/${editingGroup.id}`);
    else navigate("/groups");
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold sm:text-xl">
          {editingGroup ? "Guruhni tahrirlash" : "Yangi guruh qo'shish"}
        </h1>
        <Button type="button" variant="outline" onClick={onCancel} className="h-11">
          Bekor qilish
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-5">
        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Group Name</span>
          <input
            {...register("name")}
            type="text"
            placeholder="English A1"
            className={fieldClassName}
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </label>

        {/* Add Student */}
        <div className="rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className={labelClassName}>Add Student</span>
            <span className="text-xs text-gray-500">
              {students.length} / {MAX_STUDENTS_PER_GROUP}
            </span>
          </div>

          {students.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {students.map((studentName, index) => (
                <li
                  key={`${studentName}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 py-1 pr-1 pl-3 text-sm text-gray-700"
                >
                  {studentName}
                  <button
                    type="button"
                    onClick={() => removeStudent(index)}
                    className="flex h-5 w-5 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                    aria-label={`${studentName} ni olib tashlash`}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {students.length < MAX_STUDENTS_PER_GROUP && (
            <div className="mt-3 flex gap-2">
              <input
                value={studentInput}
                onChange={(event) => setStudentInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    // Asosiy formani yubormaslik uchun Enter'ni ushlab qolamiz
                    event.preventDefault();
                    addStudent();
                  }
                }}
                type="text"
                list={STUDENT_SUGGESTIONS_ID}
                placeholder="Student ismini yozing (Enter bilan qo'shiladi)"
                className={fieldClassName}
              />
              <datalist id={STUDENT_SUGGESTIONS_ID}>
                {/* Avvaldan mavjud o'quvchilar tavsiya sifatida chiqadi */}
                {MOCK_STUDENTS.map((student) => (
                  <option key={student.id} value={getFullName(student)} />
                ))}
              </datalist>
              <Button
                type="button"
                onClick={addStudent}
                disabled={!studentInput.trim()}
                className="h-11 shrink-0 px-4"
              >
                Qo&apos;shish
              </Button>
            </div>
          )}

          {studentError && (
            <span className="mt-1.5 block text-xs text-red-500">{studentError}</span>
          )}
        </div>

        {/* Add Teacher */}
        <div className="flex flex-col gap-1.5">
          <span className={labelClassName}>Add Teacher</span>
          <select {...register("teacherId")} className={fieldClassName}>
            <option value="">Tanlanmagan</option>
            {GROUP_TEACHERS.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
            <option value={CUSTOM_TEACHER}>Boshqa — qo&apos;lda kiritish</option>
          </select>

          {teacherId === CUSTOM_TEACHER && (
            <input
              {...register("teacherName")}
              type="text"
              placeholder="Ustozning ismi familyasi"
              className={`${fieldClassName} mt-1.5`}
            />
          )}
          {errors.teacherName && (
            <span className="text-xs text-red-500">{errors.teacherName.message}</span>
          )}
        </div>

        {/* Add Time */}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Add Time</span>
            <input {...register("time")} type="time" className={fieldClassName} />
            {errors.time && <span className="text-xs text-red-500">{errors.time.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Kunlar</span>
            <select {...register("scheduleType")} className={fieldClassName}>
              {Object.entries(scheduleTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="-mt-2 text-xs text-gray-500">
          {time || "18:00"} &mdash; {scheduleTypeLabels[scheduleType]}
        </p>

        <div className="flex flex-wrap gap-2">
          {TIME_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setValue("time", preset)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                time === preset
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Add Direction */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Add Direction</span>
          <select {...register("direction")} className={fieldClassName}>
            {DIRECTIONS.map((direction) => (
              <option key={direction} value={direction}>
                {direction}
              </option>
            ))}
          </select>
          {errors.direction && (
            <span className="text-xs text-red-500">{errors.direction.message}</span>
          )}
        </label>

        {/* Add Link */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Add Link (Telegram / Jira)</span>
          <input
            {...register("link")}
            type="url"
            placeholder="https://t.me/..."
            className={fieldClassName}
          />
          {errors.link && <span className="text-xs text-red-500">{errors.link.message}</span>}
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Start Date</span>
            <input {...register("startDate")} type="date" className={fieldClassName} />
            {errors.startDate && (
              <span className="text-xs text-red-500">{errors.startDate.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>End Date</span>
            <input {...register("endDate")} type="date" className={fieldClassName} />
            {errors.endDate && <span className="text-xs text-red-500">{errors.endDate.message}</span>}
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Payment (so&apos;m)</span>
            <input
              {...register("payment")}
              type="number"
              min="0"
              placeholder="900000"
              className={fieldClassName}
            />
            {errors.payment && <span className="text-xs text-red-500">{errors.payment.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Number of Lessons</span>
            <input
              {...register("lessonCount")}
              type="number"
              min="1"
              placeholder="24"
              className={fieldClassName}
            />
            {errors.lessonCount && (
              <span className="text-xs text-red-500">{errors.lessonCount.message}</span>
            )}
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel} className="h-11">
            Bekor qilish
          </Button>
          <Button type="submit" className="h-11">
            Saqlash
          </Button>
        </div>
      </form>
    </section>
  );
};

export default GroupFormPage;
