'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  CircularProgress,
  Paper,
  Grid,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { 
  Add, 
  Edit, 
  Delete, 
  ExpandMore,
  OpenInNew,
  VideoLibrary,
  Description,
  PictureAsPdf,
  Apps,
} from '@mui/icons-material'
import AdminLayout from '@/components/admin/AdminLayout'
import { createClient } from '@/lib/supabase/client'
import { Resource, Subject, DifficultyLevel } from '@/types/database'

interface ResourceFormData {
  id?: string
  name: string
  description: string
  url: string
  category: 'video' | 'document' | 'pdf' | 'application'
  subject_id: string
  difficulty_level: DifficultyLevel | null
  is_active: boolean
}

const resourceCategories = [
  { value: 'video', label: 'Video', icon: VideoLibrary },
  { value: 'document', label: 'Doküman', icon: Description },
  { value: 'pdf', label: 'PDF', icon: PictureAsPdf },
  { value: 'application', label: 'Uygulama', icon: Apps },
] as const

const difficultyLevels = [
  { value: 'baslangic', label: 'Başlangıç' },
  { value: 'orta', label: 'Orta' },
  { value: 'ileri', label: 'İleri' },
  { value: 'uzman', label: 'Uzman' },
] as const

export default function ResourceManagement() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [resources, setResources] = useState<Record<string, Resource[]>>({})
  const [loading, setLoading] = useState(true)
  
  // Resource dialog states
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [resourceFormData, setResourceFormData] = useState<ResourceFormData>({
    name: '',
    description: '',
    url: '',
    category: 'document',
    subject_id: '',
    difficulty_level: null,
    is_active: true,
  })
  
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set())

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      redirect('/login')
      return
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      redirect('/login')
      return
    }

    await loadSubjectsAndResources()
  }

  const loadSubjectsAndResources = async () => {
    try {
      const supabase = createClient()
      
      // Load subjects
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('subjects')
        .select('*')
        .order('name')

      if (subjectsError) throw subjectsError
      setSubjects(subjectsData || [])

      // Load resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })

      if (resourcesError) throw resourcesError

      // Group resources by subject_id
      const resourcesBySubject: Record<string, Resource[]> = {}

      resourcesData?.forEach((resource) => {
        if (resource.subject_id) {
          if (!resourcesBySubject[resource.subject_id]) {
            resourcesBySubject[resource.subject_id] = []
          }
          resourcesBySubject[resource.subject_id].push(resource)
        }
      })

      setResources(resourcesBySubject)

    } catch (error) {
      console.error('Error loading subjects and resources:', error)
    } finally {
      setLoading(false)
    }
  }

  // Resource handlers
  const handleAddResource = (subjectId?: string) => {
    setEditingResource(null)
    setResourceFormData({
      name: '',
      description: '',
      url: '',
      category: 'document',
      subject_id: subjectId || '',
      difficulty_level: null,
      is_active: true,
    })
    setFormError(null)
    setResourceDialogOpen(true)
  }

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource)
    setResourceFormData({
      id: resource.id,
      name: resource.name,
      description: resource.description || '',
      url: resource.url,
      category: resource.category,
      subject_id: resource.subject_id || '',
      difficulty_level: resource.difficulty_level || null,
      is_active: resource.is_active,
    })
    setFormError(null)
    setResourceDialogOpen(true)
  }

  const handleDeleteResource = async (resourceId: string) => {
    if (!confirm('Bu kaynağı silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceId)

      if (error) throw error
      await loadSubjectsAndResources()
    } catch (error: any) {
      alert('Kaynak silinirken hata oluştu: ' + error.message)
    }
  }

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setFormError('Kullanıcı oturumu bulunamadı')
        return
      }

      const resourceData = {
        name: resourceFormData.name,
        description: resourceFormData.description || null,
        url: resourceFormData.url,
        category: resourceFormData.category,
        subject_id: resourceFormData.subject_id || null,
        difficulty_level: resourceFormData.difficulty_level,
        is_active: resourceFormData.is_active,
        created_by: user.id,
      }

      if (editingResource) {
        // Update existing resource
        const { error } = await supabase
          .from('resources')
          .update(resourceData)
          .eq('id', editingResource.id)

        if (error) throw error
      } else {
        // Create new resource
        const { error } = await supabase
          .from('resources')
          .insert(resourceData)

        if (error) throw error
      }

      setResourceDialogOpen(false)
      await loadSubjectsAndResources()
    } catch (error: any) {
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleSubjectExpansion = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects)
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId)
    } else {
      newExpanded.add(subjectId)
    }
    setExpandedSubjects(newExpanded)
  }

  const getCategoryIcon = (category: string) => {
    const categoryConfig = resourceCategories.find(c => c.value === category)
    const IconComponent = categoryConfig?.icon || Description
    return <IconComponent />
  }

  const getCategoryLabel = (category: string) => {
    return resourceCategories.find(c => c.value === category)?.label || category
  }

  const getDifficultyColor = (level: DifficultyLevel) => {
    switch (level) {
      case 'baslangic': return 'success'
      case 'orta': return 'warning'
      case 'ileri': return 'error'
      case 'uzman': return 'secondary'
      default: return 'default'
    }
  }

  const getDifficultyLabel = (level: DifficultyLevel) => {
    return difficultyLevels.find(d => d.value === level)?.label || level
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/resources">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout currentPage="/admin/resources">
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Kaynak Yönetimi</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleAddResource()}
          >
            Yeni Kaynak
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Subjects with their resources */}
          {subjects.map((subject) => (
            <Grid item xs={12} key={subject.id}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                      onClick={() => toggleSubjectExpansion(subject.id)}
                      size="small"
                    >
                      <ExpandMore
                        sx={{
                          transform: expandedSubjects.has(subject.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s',
                        }}
                      />
                    </IconButton>
                    <Typography variant="h6">{subject.name}</Typography>
                    <Chip 
                      label={subject.is_active ? 'Aktif' : 'Pasif'} 
                      color={subject.is_active ? 'success' : 'default'}
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {resources[subject.id]?.length || 0} kaynak
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Button
                      size="small"
                      startIcon={<Add />}
                      onClick={() => handleAddResource(subject.id)}
                      sx={{ mr: 1 }}
                    >
                      Kaynak Ekle
                    </Button>
                  </Box>
                </Box>

                {subject.description && (
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {subject.description}
                  </Typography>
                )}

                {expandedSubjects.has(subject.id) && (
                  <Box sx={{ mt: 2, pl: 4 }}>
                    {resources[subject.id]?.length > 0 ? (
                      resources[subject.id].map((resource) => (
                        <Paper key={resource.id} variant="outlined" sx={{ p: 2, mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              {getCategoryIcon(resource.category)}
                              <Typography variant="subtitle1">{resource.name}</Typography>
                              <Chip 
                                label={getCategoryLabel(resource.category)} 
                                color="primary"
                                size="small"
                                variant="outlined"
                              />
                              <Chip 
                                label={resource.is_active ? 'Aktif' : 'Pasif'} 
                                color={resource.is_active ? 'success' : 'default'}
                                size="small"
                              />
                              {resource.difficulty_level && (
                                <Chip 
                                  label={getDifficultyLabel(resource.difficulty_level)} 
                                  color={getDifficultyColor(resource.difficulty_level)}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Button
                                size="small"
                                startIcon={<OpenInNew />}
                                onClick={() => window.open(resource.url, '_blank')}
                                sx={{ textTransform: 'none' }}
                              >
                                Aç
                              </Button>
                              <IconButton onClick={() => handleEditResource(resource)} size="small">
                                <Edit />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteResource(resource.id)} size="small" color="error">
                                <Delete />
                              </IconButton>
                            </Box>
                          </Box>
                          {resource.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 3 }}>
                              {resource.description}
                            </Typography>
                          )}
                        </Paper>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Bu derste henüz kaynak bulunmuyor.
                      </Typography>
                    )}
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}


        </Grid>

        {/* Resource Dialog */}
        <Dialog open={resourceDialogOpen} onClose={() => setResourceDialogOpen(false)} maxWidth="sm" fullWidth>
          <form onSubmit={handleResourceSubmit}>
            <DialogTitle>
              {editingResource ? 'Kaynak Düzenle' : 'Yeni Kaynak Ekle'}
            </DialogTitle>
            <DialogContent>
              {formError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formError}
                </Alert>
              )}
              
              <TextField
                fullWidth
                label="Kaynak Adı"
                value={resourceFormData.name}
                onChange={(e) => setResourceFormData({ ...resourceFormData, name: e.target.value })}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Açıklama"
                value={resourceFormData.description}
                onChange={(e) => setResourceFormData({ ...resourceFormData, description: e.target.value })}
                multiline
                rows={3}
                margin="normal"
              />

              <TextField
                fullWidth
                label="URL"
                value={resourceFormData.url}
                onChange={(e) => setResourceFormData({ ...resourceFormData, url: e.target.value })}
                margin="normal"
                required
                type="url"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={resourceFormData.category}
                  label="Kategori"
                  onChange={(e) => setResourceFormData({ ...resourceFormData, category: e.target.value as any })}
                >
                  {resourceCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <category.icon fontSize="small" />
                        {category.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Ders (Opsiyonel)</InputLabel>
                <Select
                  value={resourceFormData.subject_id}
                  label="Ders (Opsiyonel)"
                  onChange={(e) => setResourceFormData({ ...resourceFormData, subject_id: e.target.value })}
                >
                  <MenuItem value="">Ders seçilmemiş</MenuItem>
                  {subjects.filter(s => s.is_active).map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Zorluk Seviyesi (Opsiyonel)</InputLabel>
                <Select
                  value={resourceFormData.difficulty_level || ''}
                  label="Zorluk Seviyesi (Opsiyonel)"
                  onChange={(e) => setResourceFormData({ 
                    ...resourceFormData, 
                    difficulty_level: e.target.value ? e.target.value as DifficultyLevel : null 
                  })}
                >
                  <MenuItem value="">Zorluk seviyesi seçilmemiş</MenuItem>
                  {difficultyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={resourceFormData.is_active}
                    onChange={(e) => setResourceFormData({ ...resourceFormData, is_active: e.target.checked })}
                  />
                }
                label="Aktif"
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setResourceDialogOpen(false)}>İptal</Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? 'Kaydediliyor...' : (editingResource ? 'Güncelle' : 'Ekle')}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </AdminLayout>
  )
} 